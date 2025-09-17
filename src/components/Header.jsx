import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

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
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>关于我们</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>联系我们</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
