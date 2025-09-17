import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Contact.css'

const Contact = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleCampusClick = (campusId) => {
    navigate(`/campus/${campusId}`)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 这里可以添加表单提交逻辑
    alert('谢谢您的留言！我们会尽快回复您。')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="contact">
      <section className="contact-hero">
        <h1>联系我们</h1>
        <p>有任何问题或建议？我们很乐意听到您的声音</p>
      </section>

      <section className="contact-content">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>联系方式</h2>
            
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <h4>联系电话</h4>
                <p>0951-3088176<br />工作日 9:00-18:00</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <h4>邮箱地址</h4>
                <p>20001204@gmail.com<br />欢迎咨询学习相关问题</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">💬</div>
              <div>
                <h4>在线客服</h4>
                <p>24小时在线支持<br />QQ：1940482460</p>
              </div>
            </div>

            <div className="office-locations">
              <div className="contact-icon">📍</div>
              <div>
                <h4>办公地址</h4>
                <div className="locations-grid">
                  <div className="location-item clickable" onClick={() => handleCampusClick('yuexinlu')}>
                    <div className="location-name">金凤区阅欣路校区</div>
                    <p>银川市金凤区阅欣路131号<br />金致未来教育集团3楼卡巴</p>
                    <div className="location-actions">
                      <span className="view-details">点击查看详情 →</span>
                    </div>
                  </div>
                  <div className="location-item clickable" onClick={() => handleCampusClick('wanda')}>
                    <div className="location-name">西夏区万达校区</div>
                    <p>银川市西夏区金波北街75号<br />万达广场(西夏店)二楼卡巴</p>
                    <div className="location-actions">
                      <span className="view-details">点击查看详情 →</span>
                    </div>
                  </div>
                  <div className="location-item clickable" onClick={() => handleCampusClick('ccpark')}>
                    <div className="location-name">金凤区ccpark校区</div>
                    <p>银川市金凤区北京中路192号<br />ccpark二楼卡巴</p>
                    <div className="location-actions">
                      <span className="view-details">点击查看详情 →</span>
                    </div>
                  </div>
                  <div className="location-item clickable" onClick={() => handleCampusClick('fenglinwan')}>
                    <div className="location-name">建发枫林湾校区</div>
                    <p>银川市金凤区建发枫林湾小镇<br />50号楼二楼卡巴</p>
                    <div className="location-actions">
                      <span className="view-details">点击查看详情 →</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h4>关注我们</h4>
              <div className="social-icons">
                <a href="#" className="social-link">📱 微信</a>
                <a href="#" className="social-link">📺 微博</a>
                <a href="#" className="social-link">📺 抖音</a>
                <a href="#" className="social-link">🎥 B站</a>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h2>在线留言</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">姓名 *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">邮箱 *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">主题 *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">请选择主题</option>
                  <option value="课程咨询">课程咨询</option>
                  <option value="技术支持">技术支持</option>
                  <option value="合作洽谈">合作洽谈</option>
                  <option value="意见建议">意见建议</option>
                  <option value="其他">其他</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">留言内容 *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="请详细描述您的问题或建议..."
                ></textarea>
              </div>

              <button type="submit" className="btn-primary submit-btn">
                发送留言
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="faq">
        <h2>常见问题</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h4>如何注册账户？</h4>
            <p>点击右上角"注册"按钮，填写基本信息即可完成注册。</p>
          </div>
          <div className="faq-item">
            <h4>课程如何付费？</h4>
            <p>我们支持支付宝、微信支付、银行卡等多种支付方式。</p>
          </div>
          <div className="faq-item">
            <h4>可以退款吗？</h4>
            <p>课程开始7天内，如不满意可申请全额退款。</p>
          </div>
          <div className="faq-item">
            <h4>有学习证书吗？</h4>
            <p>完成课程学习并通过考核后，可获得官方认证证书。</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
