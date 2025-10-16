import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './VIP.css'

const VIP = () => {
  const navigate = useNavigate()
  const { user, isLoggedIn, upgradeToVip, loading } = useUser()
  const [selectedPlan, setSelectedPlan] = useState('monthly')

  const vipPlans = {
    monthly: {
      id: 'monthly',
      name: '月度VIP',
      duration: 30,
      price: 99,
      originalPrice: 199,
      features: ['所有付费课程免费观看', '专属VIP客服', '优先获得新课程', '学习进度云同步'],
      popular: false
    },
    quarterly: {
      id: 'quarterly', 
      name: '季度VIP',
      duration: 90,
      price: 249,
      originalPrice: 597,
      features: ['所有付费课程免费观看', '专属VIP客服', '优先获得新课程', '学习进度云同步', '专属学习群', '定期直播答疑'],
      popular: true
    },
    yearly: {
      id: 'yearly',
      name: '年度VIP',
      duration: 365,
      price: 699,
      originalPrice: 2388,
      features: ['所有付费课程免费观看', '专属VIP客服', '优先获得新课程', '学习进度云同步', '专属学习群', '定期直播答疑', '一对一编程指导', '就业推荐服务'],
      popular: false
    }
  }

  const handleUpgrade = async () => {
    if (!isLoggedIn) {
      alert('请先登录')
      navigate('/login')
      return
    }

    const plan = vipPlans[selectedPlan]
    const result = await upgradeToVip(plan.duration)
    
    if (result.success) {
      alert(result.message)
      navigate('/learning')
    } else {
      alert(result.error)
    }
  }

  if (isLoggedIn && user?.isVip) {
    return (
      <div className="vip">
        <div className="vip-status-container">
          <div className="vip-status-card">
            <div className="vip-crown">👑</div>
            <h1>您已是VIP用户</h1>
            <p>感谢您对我们平台的支持！</p>
            
            <div className="vip-info">
              <div className="vip-expiry">
                <strong>VIP有效期至：</strong>
                <span>{new Date(user.vipExpiry).toLocaleDateString()}</span>
              </div>
              
              <div className="vip-benefits-active">
                <h3>您的VIP特权</h3>
                <ul>
                  <li>✅ 所有付费课程免费观看</li>
                  <li>✅ 专属VIP客服支持</li>
                  <li>✅ 新课程优先体验</li>
                  <li>✅ 学习进度云同步</li>
                  <li>✅ 专属VIP学习群</li>
                  <li>✅ 定期直播答疑</li>
                </ul>
              </div>
              
              <div className="vip-actions">
                <button className="btn-primary" onClick={() => navigate('/learning')}>
                  🎯 开始学习
                </button>
                <button className="btn-secondary" onClick={() => navigate('/profile')}>
                  👤 个人中心
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="vip">
      <div className="vip-hero">
        <div className="vip-hero-content">
          <h1>升级VIP会员</h1>
          <p>解锁全部课程，享受专属特权</p>
          <div className="vip-highlight">
            <span>🚀 立即节省高达 70% 的学习成本</span>
          </div>
        </div>
      </div>

      <div className="vip-content">
        <div className="vip-comparison">
          <h2>免费 vs VIP 对比</h2>
          <div className="comparison-table">
            <div className="comparison-header">
              <div className="feature-col">功能特性</div>
              <div className="free-col">免费用户</div>
              <div className="vip-col">VIP用户</div>
            </div>
            
            <div className="comparison-row">
              <div className="feature-name">观看免费课程</div>
              <div className="free-value">✅</div>
              <div className="vip-value">✅</div>
            </div>
            
            <div className="comparison-row">
              <div className="feature-name">观看付费课程</div>
              <div className="free-value">💰 需单独购买</div>
              <div className="vip-value">✅ 全部免费</div>
            </div>
            
            <div className="comparison-row">
              <div className="feature-name">学习进度同步</div>
              <div className="free-value">❌</div>
              <div className="vip-value">✅</div>
            </div>
            
            <div className="comparison-row">
              <div className="feature-name">专属客服</div>
              <div className="free-value">❌</div>
              <div className="vip-value">✅</div>
            </div>
            
            <div className="comparison-row">
              <div className="feature-name">新课程优先体验</div>
              <div className="free-value">❌</div>
              <div className="vip-value">✅</div>
            </div>
          </div>
        </div>

        <div className="vip-plans">
          <h2>选择您的VIP套餐</h2>
          <div className="plans-grid">
            {Object.entries(vipPlans).map(([key, plan]) => (
              <div 
                key={key}
                className={`plan-card ${selectedPlan === key ? 'selected' : ''} ${plan.popular ? 'popular' : ''}`}
                onClick={() => setSelectedPlan(key)}
              >
                {plan.popular && <div className="popular-badge">🔥 最受欢迎</div>}
                
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-pricing">
                    <span className="current-price">￥{plan.price}</span>
                    <span className="original-price">￥{plan.originalPrice}</span>
                  </div>
                  <div className="savings">
                    节省 ￥{plan.originalPrice - plan.price}
                  </div>
                </div>
                
                <div className="plan-features">
                  <ul>
                    {plan.features.map((feature, index) => (
                      <li key={index}>✅ {feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="plan-duration">
                  有效期：{plan.duration} 天
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="vip-purchase">
          <div className="purchase-summary">
            <h3>订单摘要</h3>
            <div className="selected-plan-info">
              <div className="plan-name">{vipPlans[selectedPlan].name}</div>
              <div className="plan-price">￥{vipPlans[selectedPlan].price}</div>
            </div>
            <div className="savings-highlight">
              💰 相比单独购买课程，您将节省 ￥{vipPlans[selectedPlan].originalPrice - vipPlans[selectedPlan].price}
            </div>
          </div>

          <div className="purchase-actions">
            {isLoggedIn ? (
              <button 
                className="btn-primary upgrade-btn"
                onClick={handleUpgrade}
                disabled={loading}
              >
                {loading ? '处理中...' : `💎 立即升级VIP (￥${vipPlans[selectedPlan].price})`}
              </button>
            ) : (
              <div className="login-required">
                <p>升级VIP需要先登录账号</p>
                <button className="btn-primary" onClick={() => navigate('/login')}>
                  立即登录
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="vip-faq">
          <h2>常见问题</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h4>VIP会员有什么特权？</h4>
              <p>VIP会员可以免费观看所有付费课程，享受专属客服支持，优先体验新课程等特权。</p>
            </div>
            <div className="faq-item">
              <h4>VIP会员如何计费？</h4>
              <p>VIP会员按照您选择的套餐一次性收费，没有自动续费，到期前我们会提醒您续费。</p>
            </div>
            <div className="faq-item">
              <h4>可以退款吗？</h4>
              <p>VIP开通后7天内，如果您不满意，可以申请全额退款。</p>
            </div>
            <div className="faq-item">
              <h4>VIP到期后会怎样？</h4>
              <p>VIP到期后，您之前学习的课程记录会保留，但需要重新购买或续费VIP才能继续观看付费课程。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VIP
