import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()

  const handleStartLearning = () => {
    navigate('/courses')
  }

  const handleCourseClick = () => {
    navigate('/courses')
  }

  const handleFeatureClick = (feature) => {
    if (feature === '优质课程') {
      navigate('/courses')
    }
  }
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>欢迎来到在线学习平台</h1>
          <p>发现知识的力量，开启学习的新篇章</p>
          <button className="btn-primary hero-btn" onClick={handleStartLearning}>开始学习</button>
        </div>
      </section>

      <section className="features">
        <div className="feature-grid">
          <div className="feature-card clickable" onClick={() => handleFeatureClick('优质课程')}>
            <div className="feature-icon">🎓</div>
            <h3>优质课程</h3>
            <p>精心设计的课程内容，助您快速掌握新技能</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍🏫</div>
            <h3>专业导师</h3>
            <p>经验丰富的导师团队，提供个性化指导</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏰</div>
            <h3>灵活时间</h3>
            <p>随时随地学习，安排属于您的学习时间</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>认证证书</h3>
            <p>完成课程获得权威认证，提升职业竞争力</p>
          </div>
        </div>
      </section>

      <section className="popular-courses">
        <h2>热门课程推荐</h2>
        <div className="course-grid">
          <div className="course-card clickable" onClick={handleCourseClick}>
            <img src="https://via.placeholder.com/300x200?text=React+基础" alt="React基础课程" />
            <div className="course-info">
              <h4>React 基础入门</h4>
              <p>学习现代前端开发必备技能</p>
              <span className="price">￥199</span>
            </div>
          </div>
          <div className="course-card clickable" onClick={handleCourseClick}>
            <img src="https://via.placeholder.com/300x200?text=Node.js+后端" alt="Node.js后端课程" />
            <div className="course-info">
              <h4>Node.js 后端开发</h4>
              <p>掌握服务端JavaScript编程</p>
              <span className="price">￥299</span>
            </div>
          </div>
          <div className="course-card clickable" onClick={handleCourseClick}>
            <img src="https://via.placeholder.com/300x200?text=数据库+设计" alt="数据库设计课程" />
            <div className="course-info">
              <h4>数据库设计与优化</h4>
              <p>深入理解数据库设计原理</p>
              <span className="price">￥249</span>
            </div>
          </div>
        </div>
        <div className="view-more-section">
          <button className="btn-primary view-more-btn" onClick={handleCourseClick}>
            查看更多课程 →
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
