import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import AlipaySdk from "alipay-sdk";
import AlipayFormData from "alipay-sdk/lib/form.js";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "256kb" }));
app.use(express.urlencoded({ extended: false }));

// 映射语言：Judge0 的 C++23 是 105，C++20 是 98（不同实例可能略有差异）
const LANG_MAP = { cpp: 105 };

const headers = {
  "Content-Type": "application/json"
};
if (process.env.RAPIDAPI_KEY) {
  headers["X-RapidAPI-Key"] = process.env.RAPIDAPI_KEY;
  headers["X-RapidAPI-Host"] = new URL(process.env.JUDGE0_BASE).host;
}

app.post("/api/run", async (req, res) => {
  try {
    const { language = "cpp", source = "", stdin = "" } = req.body || {};
    if (!source.trim()) return res.status(400).json({ error: "Empty source" });

    console.log("收到代码执行请求:", { language, source: source.substring(0, 100) + "...", stdin });
    
    // 使用 Piston API - 免费的在线代码执行服务
    const pistonUrl = "https://emkc.org/api/v2/piston";
    
    // 创建提交（添加超时控制）
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时
    
    const createResponse = await fetch(`${pistonUrl}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: "cpp",
        version: "10.2.0",
        files: [{
          content: source
        }],
        stdin: stdin,
        args: []
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!createResponse.ok) {
      throw new Error(`Piston API error: ${createResponse.status}`);
    }

    const result = await createResponse.json();
    
    // 统一返回结构（适配 Piston API 响应格式）
    res.json({
      status: result.run?.code === 0 ? "Accepted" : "Runtime Error",
      stdout: result.run?.stdout || "",
      stderr: result.run?.stderr || "",
      compile_output: result.compile?.stderr || "",
      time: result.run?.runtime || "0",
      memory: "0", // Piston API 不提供内存信息
    });
  } catch (e) {
    console.error("编译执行错误:", e.message);
    
    if (e.name === 'AbortError') {
      res.status(408).json({ 
        error: "执行超时",
        details: "代码执行时间超过10秒，请检查是否有无限循环"
      });
    } else if (e.message.includes('fetch')) {
      res.status(503).json({ 
        error: "服务不可用",
        details: "编译服务暂时不可用，请稍后重试"
      });
    } else {
      res.status(500).json({ 
        error: e.message || "Run failed",
        details: "请检查代码语法或网络连接"
      });
    }
  }
});

/**
 * -------------------------
 * 支付宝（沙箱）支付能力
 * -------------------------
 * 说明：
 * 1. 仅演示信息流，资金流仍由支付宝控制，符合国内“二清”限制。
 * 2. 需要在 .env 中配置以下变量：
 *    - ALIPAY_APP_ID
 *    - ALIPAY_PRIVATE_KEY
 *    - ALIPAY_PUBLIC_KEY
 *    - ALIPAY_GATEWAY (可选，默认沙箱网关)
 *    - ALIPAY_NOTIFY_URL（公网可访问，供支付宝异步回调）
 *    - ALIPAY_RETURN_URL（前端支付成功后的跳转地址）
 */

const sanitizeKey = (key = "") => key.replace(/\\n/g, "\n");

const alipayClient =
  process.env.ALIPAY_APP_ID &&
  process.env.ALIPAY_PRIVATE_KEY &&
  process.env.ALIPAY_PUBLIC_KEY
    ? new AlipaySdk({
        appId: process.env.ALIPAY_APP_ID,
        privateKey: sanitizeKey(process.env.ALIPAY_PRIVATE_KEY),
        alipayPublicKey: sanitizeKey(process.env.ALIPAY_PUBLIC_KEY),
        gateway:
          process.env.ALIPAY_GATEWAY ||
          "https://openapi-sandbox.dl.alipaydev.com/gateway.do",
        signType: "RSA2",
      })
    : null;

if (!alipayClient) {
  console.warn(
    "[支付提醒] 未检测到支付宝配置，支付接口将返回 503。请在 .env 中设置 ALIPAY_* 变量。",
  );
}

// 简易的内存订单表，仅用于演示。生产环境请使用数据库。
const orders = new Map();

app.post("/api/payments/alipay/create", async (req, res) => {
  if (!alipayClient) {
    return res.status(503).json({
      error: "支付网关未配置",
      details: "请联系管理员在服务器上配置 ALIPAY_* 环境变量",
    });
  }

  const { amount, subject = "课程订单", productId } = req.body || {};
  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ error: "金额不合法" });
  }

  try {
    const orderId = `order_${Date.now()}_${uuidv4().slice(0, 8)}`;
    orders.set(orderId, {
      amount: Number(amount).toFixed(2),
      status: "PENDING",
      productId,
      createdAt: new Date().toISOString(),
    });

    const formData = new AlipayFormData();
    formData.setMethod("get");
    if (process.env.ALIPAY_NOTIFY_URL) {
      formData.addField("notifyUrl", process.env.ALIPAY_NOTIFY_URL);
    }
    if (process.env.ALIPAY_RETURN_URL) {
      formData.addField("returnUrl", process.env.ALIPAY_RETURN_URL);
    }
    formData.addField("bizContent", {
      outTradeNo: orderId,
      productCode: "FAST_INSTANT_TRADE_PAY",
      totalAmount: Number(amount).toFixed(2),
      subject,
      body: `ProductId:${productId || "UNKNOWN"}`,
    });

    const payUrl = await alipayClient.exec(
      "alipay.trade.page.pay",
      {},
      { formData },
    );

    res.json({
      success: true,
      data: { orderId, payUrl },
    });
  } catch (error) {
    console.error("[Alipay Create Error]", error);
    res.status(500).json({
      error: "发起支付失败",
      details: error.message,
    });
  }
});

app.post("/api/payments/alipay/notify", async (req, res) => {
  if (!alipayClient) return res.send("failure");

  try {
    const params = req.body;
    const verified = alipayClient.checkNotifySign(params);
    if (!verified) {
      console.warn("[Alipay Notify] 验签失败", params);
      return res.send("failure");
    }

    const {
      out_trade_no: orderId,
      total_amount: totalAmount,
      trade_status: tradeStatus,
      trade_no: tradeNo,
    } = params;

    const order = orders.get(orderId);
    if (!order) {
      console.warn("[Alipay Notify] 未找到订单", orderId);
      return res.send("failure");
    }

    if (Number(order.amount).toFixed(2) !== Number(totalAmount).toFixed(2)) {
      console.warn("[Alipay Notify] 金额不匹配", orderId);
      return res.send("failure");
    }

    if (["TRADE_SUCCESS", "TRADE_FINISHED"].includes(tradeStatus)) {
      orders.set(orderId, {
        ...order,
        status: "PAID",
        tradeNo,
        tradeStatus,
        paidAt: new Date().toISOString(),
      });
    }

    return res.send("success");
  } catch (error) {
    console.error("[Alipay Notify Error]", error);
    return res.send("failure");
  }
});

app.get("/api/payments/alipay/status/:orderId", (req, res) => {
  const order = orders.get(req.params.orderId);
  if (!order) {
    return res.status(404).json({ error: "订单不存在" });
  }
  res.json({ success: true, data: order });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Run API -> http://localhost:${PORT}`);
});
