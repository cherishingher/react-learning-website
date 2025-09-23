import React from 'react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>📚 学习网站</h3>
            <p>致力于提供优质的在线学习体验</p>
          </div>
          <div className="footer-section">
            <h4>快速链接</h4>
            <ul>
              <li><a href="/">首页</a></li>
              <li><a href="/courses">课程</a></li>
              <li><a href="/about">关于我们</a></li>
              <li><a href="/contact">联系我们</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>联系信息</h4>
            <p>📧 邮箱：20001204@gmail.com</p>
            <p>📞 电话：0951-3088176</p>
            <p>💬 QQ：1940482460</p>
            <p>📍 银川市多个校区</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} 学习网站. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
