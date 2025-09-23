import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "256kb" }));

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Run API -> http://localhost:${PORT}`);
});
