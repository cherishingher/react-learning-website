import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './Header.css'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isLoggedIn, logout } = useUser()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h1>📚 学习网站</h1>
          </Link>
        </div>
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          ☰
        </button>
        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>首页</Link>
          <Link to="/courses" className={`nav-link ${location.pathname === '/courses' ? 'active' : ''}`}>课程</Link>
          <Link to="/learning" className={`nav-link ${location.pathname === '/learning' ? 'active' : ''}`}>
            🎯 学习中心
          </Link>
          <Link to="/gesp" className={`nav-link gesp-nav ${location.pathname === '/gesp' ? 'active' : ''}`}>
            🏆 GESP考级
          </Link>
          <Link to="/playground" className={`nav-link ${location.pathname === '/playground' ? 'active' : ''}`}>
            💻 C++ 编译器
          </Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>关于我们</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>联系我们</Link>
          
          {isLoggedIn ? (
            <div className="user-menu">
              <div className="user-info">
                <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                <span className="user-name">{user?.name}</span>
                {user?.isVip && <span className="vip-mini-badge">👑</span>}
              </div>
              <div className="user-dropdown">
                <Link to="/profile" className="dropdown-item">👤 个人中心</Link>
                {!user?.isVip && <Link to="/vip" className="dropdown-item">👑 升级VIP</Link>}
                <button onClick={logout} className="dropdown-item logout-btn">🚪 退出登录</button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-link login-link">登录</Link>
              <Link to="/vip" className="nav-link vip-link">👑 VIP</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
