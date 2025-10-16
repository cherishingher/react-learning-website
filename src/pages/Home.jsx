import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Home.css'
import CertificateCarousel from '../components/CertificateCarousel'
import TechBackground from '../components/TechBackground'
import CodeRain from '../components/CodeRain'
import TechDecoration from '../components/TechDecoration'
import '../components/TechBackground.css'

const Home = () => {
  const navigate = useNavigate()

  const handleStartLearning = () => {
    navigate('/courses')
  }

  const handleCourseClick = () => {
    navigate('/courses')
  }

  const handleGESPClick = () => {
    navigate('/gesp')
  }

  const handleLearningClick = () => {
    navigate('/learning')
  }

  const handleCompetitionClick = () => {
    navigate('/gesp/cpp')
  }

  const handleFeatureClick = (feature) => {
    if (feature === '优质课程') {
      navigate('/courses')
    }
  }

  // Framer Motion 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  }

  const heroVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const floatVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <motion.div 
      className="home"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* 科技背景效果 */}
      <CodeRain />
      <div className="tech-grid-background" />
      <div className="scanline" />
      <TechDecoration />

      <motion.section 
        className="hero"
        variants={heroVariants}
      >
        <TechBackground />
        <motion.div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            欢迎来到在线学习平台
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            发现知识的力量，开启学习的新篇章
          </motion.p>
          <motion.button 
            className="btn-primary hero-btn" 
            onClick={handleStartLearning}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(255, 255, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            开始学习
          </motion.button>
        </motion.div>
      </motion.section>

      <section className="achievements">
        <div className="achievements-content">
          <div className="achievements-text">
            <h2>学员荣誉</h2>
            <p>
              我们的学员在各类编程竞赛、科技创新大赛中屡获佳绩，
              这些荣誉是对我们教学质量与学习氛围的最好证明。
            </p>
            <div className="achievement-stats">
              <div>
                <span className="achievement-number">120+</span>
                <span className="achievement-label">竞赛奖项</span>
              </div>
              <div>
                <span className="achievement-number">35</span>
                <span className="achievement-label">省市冠军</span>
              </div>
              <div>
                <span className="achievement-number">98%</span>
                <span className="achievement-label">考试通过率</span>
              </div>
            </div>
            <button className="btn-primary achievements-btn" onClick={handleGESPClick}>
              查看全部荣誉
            </button>
          </div>
          <div className="achievements-carousel">
            <CertificateCarousel />
          </div>
        </div>
      </section>

      <motion.section 
        className="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.div className="feature-grid">
          <motion.div 
            className="feature-card clickable neon-glow hologram" 
            onClick={() => handleFeatureClick('优质课程')}
            variants={itemVariants}
            whileHover={{ 
              y: -12, 
              boxShadow: '0 20px 50px rgba(14, 165, 233, 0.3)',
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="feature-icon"
              animate={floatVariants.animate}
            >
              🎓
            </motion.div>
            <h3>优质课程</h3>
            <p>精心设计的课程内容，助您快速掌握新技能</p>
          </motion.div>
          <motion.div 
            className="feature-card neon-glow hologram"
            variants={itemVariants}
            whileHover={{ 
              y: -12, 
              boxShadow: '0 20px 50px rgba(99, 102, 241, 0.3)',
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              className="feature-icon"
              animate={floatVariants.animate}
              style={{ animationDelay: '0.5s' }}
            >
              👨‍🏫
            </motion.div>
            <h3>专业导师</h3>
            <p>经验丰富的导师团队，提供个性化指导</p>
          </motion.div>
          <motion.div 
            className="feature-card neon-glow hologram"
            variants={itemVariants}
            whileHover={{ 
              y: -12, 
              boxShadow: '0 20px 50px rgba(16, 185, 129, 0.3)',
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              className="feature-icon"
              animate={floatVariants.animate}
              style={{ animationDelay: '1s' }}
            >
              ⏰
            </motion.div>
            <h3>灵活时间</h3>
            <p>随时随地学习，安排属于您的学习时间</p>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section 
        className="popular-courses"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          平台精品课程
        </motion.h2>
        <motion.div className="course-grid">
          <motion.div 
            className="course-card clickable gesp-course neon-glow pulse-border" 
            onClick={handleGESPClick}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              y: -15,
              boxShadow: '0 20px 60px rgba(255, 107, 53, 0.3)',
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="https://via.placeholder.com/300x200/FF6B35/white?text=GESP考级认证" alt="GESP考级课程" />
            <div className="course-info">
              <div className="course-badge featured">🏆 权威认证</div>
              <h4>GESP青少年编程考级</h4>
              <p>中国计算机学会官方认证，三种语言八个等级</p>
              <div className="course-features">
                <span className="feature-tag">⚡ C++</span>
                <span className="feature-tag">🐍 Python</span>
                <span className="feature-tag">🎨 Scratch</span>
              </div>
              <span className="price special">权威认证</span>
            </div>
          </motion.div>

          <motion.div 
            className="course-card clickable learning-course neon-glow pulse-border" 
            onClick={handleLearningClick}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              y: -15,
              boxShadow: '0 20px 60px rgba(55, 118, 171, 0.3)',
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="https://via.placeholder.com/300x200/3776AB/white?text=在线学习中心" alt="在线学习课程" />
            <div className="course-info">
              <div className="course-badge popular">🔥 最受欢迎</div>
              <h4>在线学习中心</h4>
              <p>Scratch、Python、C++三大方向，免费+付费课程</p>
              <div className="course-features">
                <span className="feature-tag">🆓 免费课程</span>
                <span className="feature-tag">💎 VIP专享</span>
                <span className="feature-tag">📹 视频教学</span>
              </div>
              <span className="price free">免费试学</span>
            </div>
          </motion.div>

          <motion.div 
            className="course-card clickable competition-course neon-glow pulse-border" 
            onClick={handleCompetitionClick}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              y: -15,
              boxShadow: '0 20px 60px rgba(231, 76, 60, 0.3)',
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="https://via.placeholder.com/300x200/E74C3C/white?text=算法竞赛培训" alt="竞赛培训课程" />
            <div className="course-info">
              <div className="course-badge premium">👑 精英培训</div>
              <h4>算法竞赛专业培训</h4>
              <p>CSP-J/S、NOIP等级考试专业辅导和训练</p>
              <div className="course-features">
                <span className="feature-tag">🥉 CSP-J</span>
                <span className="feature-tag">🥈 CSP-S</span>
                <span className="feature-tag">🏆 NOIP</span>
              </div>
              <span className="price premium">专业培训</span>
            </div>
          </motion.div>
        </motion.div>
        <motion.div 
          className="view-more-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button 
            className="btn-primary view-more-btn" 
            onClick={handleLearningClick}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            🎯 进入学习中心 →
          </motion.button>
          <motion.button 
            className="btn-secondary view-more-btn" 
            onClick={handleGESPClick}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            🏆 GESP考级认证 →
          </motion.button>
        </motion.div>
      </motion.section>
    </motion.div>
  )
}

export default Home
