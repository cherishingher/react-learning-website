import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const { login, loading, mockUsers } = useUser()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [showDemo, setShowDemo] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      setError('请填写邮箱和密码')
      return
    }

    const result = await login(formData.email, formData.password)
    if (result.success) {
      navigate('/learning')
    } else {
      setError(result.error)
    }
  }

  const handleDemoLogin = async (email) => {
    const user = mockUsers[email]
    setFormData({
      email: email,
      password: user.password
    })
    
    const result = await login(email, user.password)
    if (result.success) {
      navigate('/learning')
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>登录学习平台</h1>
            <p>开启你的编程学习之旅</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                <span>⚠️ {error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">邮箱地址</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="请输入邮箱地址"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">密码</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="请输入密码"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary login-btn"
              disabled={loading}
            >
              {loading ? '登录中...' : '立即登录'}
            </button>
          </form>

          <div className="login-divider">
            <span>或</span>
          </div>

          <div className="demo-section">
            <button
              type="button"
              className="demo-toggle-btn"
              onClick={() => setShowDemo(!showDemo)}
            >
              🎯 体验演示账号
            </button>

            {showDemo && (
              <div className="demo-accounts">
                <h4>演示账号（点击快速登录）</h4>
                <div className="demo-account-list">
                  <div className="demo-account" onClick={() => handleDemoLogin('demo@example.com')}>
                    <div className="demo-avatar">👤</div>
                    <div className="demo-info">
                      <strong>普通用户</strong>
                      <p>demo@example.com / demo123</p>
                      <span className="demo-features">• 可观看免费课程 • 已购买部分付费课程</span>
                    </div>
                  </div>
                  
                  <div className="demo-account vip" onClick={() => handleDemoLogin('vip@example.com')}>
                    <div className="demo-avatar">👑</div>
                    <div className="demo-info">
                      <strong>VIP用户</strong>
                      <p>vip@example.com / vip123</p>
                      <span className="demo-features">• 免费观看所有课程 • VIP专享特权</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="login-footer">
            <p>还没有账号？ <Link to="/register">立即注册</Link></p>
            <p><Link to="/forgot-password">忘记密码？</Link></p>
          </div>

          <div className="platform-features">
            <h3>平台特色</h3>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🎨</div>
                <span>Scratch创意编程</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🐍</div>
                <span>Python数据分析</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <span>C++算法竞赛</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">👑</div>
                <span>VIP专享课程</span>
              </div>
            </div>
          </div>
        </div>

        <div className="login-showcase">
          <div className="showcase-content">
            <h2>加入我们的学习社区</h2>
            <div className="showcase-stats">
              <div className="stat-item">
                <div className="stat-number">10,000+</div>
                <div className="stat-label">活跃学员</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">200+</div>
                <div className="stat-label">优质课程</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">满意度</div>
              </div>
            </div>
            
            <div className="showcase-testimonials">
              <div className="testimonial">
                <p>"通过这个平台，我从零基础学会了Python，现在已经可以做数据分析了！"</p>
                <cite>- 学员 小明</cite>
              </div>
              <div className="testimonial">
                <p>"Scratch课程让我的孩子爱上了编程，创意思维得到了很大提升。"</p>
                <cite>- 家长 李女士</cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
