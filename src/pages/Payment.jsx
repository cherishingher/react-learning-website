import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('wechat');
  const [agreed, setAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 模拟订单数据 - 在真实应用中，这应该通过 URL 参数或 Context 获取
  const orderInfo = {
    id: `ORD-${Date.now()}`,
    amount: 199.00,
    productName: 'C++ 高级算法课程 (VIP会员)',
    createTime: new Date().toLocaleString()
  };

  const handlePayment = () => {
    if (!agreed) {
      alert('请先阅读并同意《用户支付协议》和《隐私政策》');
      return;
    }

    setIsProcessing(true);

    // 模拟支付请求过程
    // 法律合规提示：
    // 1. 真实场景下，必须通过后端调用微信/支付宝官方接口
    // 2. 不得存储用户银行卡号、CVV2等敏感信息
    // 3. 传输必须使用 HTTPS
    setTimeout(() => {
      setIsProcessing(false);
      // 模拟支付成功，实际应根据回调结果跳转
      alert(`模拟支付成功！\n渠道: ${paymentMethod === 'wechat' ? '微信支付' : '支付宝'}\n金额: ¥${orderInfo.amount}`);
      navigate('/learning'); 
    }, 2000);
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <motion.div 
          className="payment-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="payment-header">
            <h2>收银台</h2>
            <p>订单编号: {orderInfo.id}</p>
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span>商品名称</span>
              <span>{orderInfo.productName}</span>
            </div>
            <div className="summary-row">
              <span>下单时间</span>
              <span>{orderInfo.createTime}</span>
            </div>
            <div className="divider"></div>
            <div className="summary-row total">
              <span>应付金额</span>
              <span className="amount">¥{orderInfo.amount.toFixed(2)}</span>
            </div>
          </div>

          <div className="payment-methods">
            <h3>选择支付方式</h3>
            
            <div 
              className={`method-item ${paymentMethod === 'wechat' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('wechat')}
            >
              <div className="method-icon wechat">
                <span className="icon">💬</span> {/* 使用简单的字符代替SVG以简化代码 */}
                <span>微信支付</span>
              </div>
              <div className="radio-check"></div>
            </div>

            <div 
              className={`method-item ${paymentMethod === 'alipay' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('alipay')}
            >
              <div className="method-icon alipay">
                <span className="icon" style={{color: '#1677ff'}}>支</span>
                <span>支付宝</span>
              </div>
              <div className="radio-check"></div>
            </div>
          </div>

          {/* 核心合规部分：用户知情同意 */}
          <div className="legal-agreement">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              <span className="agreement-text">
                我已阅读并同意
                <a href="#" onClick={(e) => e.preventDefault()}>《用户支付协议》</a>
                及
                <a href="#" onClick={(e) => e.preventDefault()}>《隐私政策》</a>
              </span>
            </label>
            <p className="secure-tip">🔒 您的支付环境安全，系统仅传输加密数据</p>
          </div>

          <button 
            className={`pay-button ${isProcessing ? 'processing' : ''}`}
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? '支付处理中...' : `确认支付 ¥${orderInfo.amount.toFixed(2)}`}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;

