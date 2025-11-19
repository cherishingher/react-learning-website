import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Home.css'
import LetterGlitch from '../components/LetterGlitch'
import HeroStats from '../components/HeroStats'
import DomeGallery from '../components/DomeGallery'

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

  // 简化后的 Framer Motion 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // 减少间隔
        delayChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // 减少位移距离
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4, // 使用更简单的动画曲线
        ease: "easeOut"
      }
    }
  }

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  // 移除持续浮动动画以节省性能
  
  const heroStats = [
    { value: '120+', label: '\u7cbe\u54c1\u8bfe\u7a0b' },
    { value: '35', label: '\u83b7\u5956\u56e2\u961f' },
    { value: '98%', label: '\u8003\u8bd5\u901a\u8fc7\u7387' },
    { value: '24/7', label: '\u5b66\u4e60\u652f\u6301' }
  ]

  const honorImages = [
    {
      src: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=800&auto=format&fit=crop', // 降低图片请求分辨率
      alt: '2024 CSP-S 全国总决赛个人总分前十'
    },
    {
      src: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=800&auto=format&fit=crop',
      alt: '2023 ICPC 亚洲区域赛金牌团队'
    },
    {
      src: 'https://images.unsplash.com/photo-1451188502541-13943edb6acb?q=80&w=800&auto=format&fit=crop',
      alt: 'NOIP 2024 省队集训营优秀学员'
    },
    {
      src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
      alt: 'Codeforces Round 918 全球排名前 0.5%'
    },
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
      alt: '全国大学生算法设计邀请赛一等奖'
    },
    {
      src: 'https://images.unsplash.com/photo-1488998527040-85054a85150e?q=80&w=800&auto=format&fit=crop',
      alt: 'iGEM x 算法组跨学科优化金奖'
    },
    {
      src: 'https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?q=80&w=800&auto=format&fit=crop',
      alt: '蓝桥杯省赛算法方向特等奖'
    },
    {
      src: 'https://images.unsplash.com/photo-1527196402228-3f0f6202657b?q=80&w=800&auto=format&fit=crop',
      alt: '2024 清华大学冬令营算法特优营员'
    }
  ]

  return (
    <div className="home" style={{ position: 'relative' }}>
      {/* LetterGlitch Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, height: '100%' }}>
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>

      <motion.section 
        className="hero"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        style={{ position: 'relative', overflow: 'hidden', zIndex: 1 }}
      >
        <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            欢迎来到在线学习平台
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            发现知识的力量，开启学习的新篇章
          </motion.p>
          <motion.button 
            className="btn-primary hero-btn" 
            onClick={handleStartLearning}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ scale: 1.02 }} // 减小悬停缩放
            whileTap={{ scale: 0.98 }}
          >
            开始学习
          </motion.button>
          <HeroStats stats={heroStats} />
        </div>
      </motion.section>

      <section className="achievements" style={{ position: 'relative', zIndex: 1 }}>
        <div className="achievements-content">
          <div className="achievements-text">
            <h2>学员荣誉</h2>
            <p>
              我们的学员在各类编程竞赛、科技创新大赛中屡获佳绩，
              这些荣誉是对我们教学质量与学习氛围的最好证明。
            </p>
            <ul className="achievement-highlights">
              <li>2024 CSP-S 全国总决赛 3 位学员跻身个人总分前十，包揽现场最佳算法奖</li>
              <li>ICPC 亚洲区域赛南京站勇夺金牌，刷新校队历史最高积分</li>
              <li>NOIP 省队集训营 12 名学员全部斩获一等奖，4 人入选国家集训队候选</li>
              <li>蓝桥杯、省市联赛累计 86 项算法专项奖，算法题解被官方采纳收录</li>
            </ul>
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
          <div className="achievements-gallery">
            <DomeGallery
              images={honorImages}
              fit={0.42}
              segments={24} // 减少分段数
              dragSensitivity={20}
              overlayBlurColor="rgba(15, 23, 42, 0.9)"
              grayscale={false}
              openedImageWidth="300px"
              openedImageHeight="400px"
              autoRotate={true}
              autoRotateSpeed={0.1} // 减慢自动旋转速度
            />
            <p className="achievements-gallery-hint">拖动球幕，点击作品放大查看荣誉瞬间</p>
          </div>
        </div>
      </section>

      <motion.section 
        className="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="feature-grid">
          <motion.div 
            className="feature-card clickable neon-glow" 
            onClick={() => handleFeatureClick('优质课程')}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="feature-icon">🎓</div>
            <h3>优质课程</h3>
            <p>精心设计的课程内容，助您快速掌握新技能</p>
          </motion.div>
          <motion.div 
            className="feature-card neon-glow"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="feature-icon">👨‍🏫</div>
            <h3>专业导师</h3>
            <p>经验丰富的导师团队，提供个性化指导</p>
          </motion.div>
          <motion.div 
            className="feature-card neon-glow"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="feature-icon">⏰</div>
            <h3>灵活时间</h3>
            <p>随时随地学习，安排属于您的学习时间</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="popular-courses"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.h2
          variants={itemVariants}
          style={{ marginBottom: '2rem' }}
        >
          平台精品课程
        </motion.h2>
        <div className="course-grid">
          <motion.div 
            className="course-card clickable gesp-course neon-glow" 
            onClick={handleGESPClick}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="https://via.placeholder.com/300x200/FF6B35/white?text=GESP考级认证" alt="GESP考级课程" loading="lazy" />
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
            className="course-card clickable learning-course neon-glow" 
            onClick={handleLearningClick}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="https://via.placeholder.com/300x200/3776AB/white?text=在线学习中心" alt="在线学习课程" loading="lazy" />
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
            className="course-card clickable competition-course neon-glow" 
            onClick={handleCompetitionClick}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="https://via.placeholder.com/300x200/E74C3C/white?text=算法竞赛培训" alt="竞赛培训课程" loading="lazy" />
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
        </div>
        
        <motion.div 
          className="view-more-section"
          variants={itemVariants}
          style={{ marginTop: '3rem' }}
        >
          <button 
            className="btn-primary view-more-btn" 
            onClick={handleLearningClick}
          >
            🎯 进入学习中心 →
          </button>
          <button 
            className="btn-secondary view-more-btn" 
            onClick={handleGESPClick}
            style={{ marginLeft: '1rem' }}
          >
            🏆 GESP考级认证 →
          </button>
        </motion.div>
      </motion.section>
    </div>
  )
}

export default Home
