import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Courses.css'
import { COURSE_LIST, COURSE_CATEGORIES, CATEGORY_ICON_MAP } from '../data/courseCatalog'
import FallingText from '../components/FallingText'

const Courses = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const handleEnrollCourse = (course) => {
    if (course.link) {
      navigate(course.link)
    } else {
      alert(`感谢您的兴趣！"${course.title}" 课程功能正在开发中。\n请通过联系我们页面了解更多信息。`)
      navigate('/contact')
    }
  }

  const handleCourseCardClick = (course) => {
    if (course.link) {
      navigate(course.link)
    } else {
      navigate('/learning')
    }
  }

  const courses = COURSE_LIST

  const categories = COURSE_CATEGORIES

  const filteredCourses = useMemo(() => {
    if (selectedCategory === '全部') {
      return courses
    }
    return courses.filter(course => course.category === selectedCategory)
  }, [courses, selectedCategory])

  const courseStats = useMemo(() => {
    const totalStudents = courses.reduce((sum, c) => sum + c.students, 0)
    const freeCount = courses.filter(c => c.price === 0 || c.price === 'VIP免费').length
    return {
      totalCount: courses.length,
      freeCount,
      totalStudents: totalStudents.toLocaleString()
    }
  }, [courses])

  // Framer Motion 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  }

  const filterVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.div 
      className="courses"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ position: 'relative' }}
    >
      <motion.div 
        className="courses-header circuit-pattern"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <h1 style={{ position: 'relative', zIndex: 1 }}>全部课程</h1>
        <p style={{ position: 'relative', zIndex: 1 }}>选择适合您的课程，开启学习之旅</p>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <FallingText
            text="AI算法、机器人编程、创意图形、竞赛冲刺……多维课程体系为不同阶段的学习者打造成长路径。"
            highlightWords={['AI', '算法', '机器人', '编程', '竞赛']}
            trigger="hover"
            backgroundColor="rgba(255, 255, 255, 0.08)"
            fontSize="1.6rem"
            gravity={0.5}
            className="courses-hero-falling-text"
          />
        </div>
      </motion.div>

      <motion.div 
        className="filter-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3>课程分类</h3>
        <motion.div 
          className="category-filters"
          variants={containerVariants}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              variants={filterVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 6px 20px rgba(14, 165, 233, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }}
            >
              {CATEGORY_ICON_MAP[category] ? `${CATEGORY_ICON_MAP[category]} ` : ''}
              {category}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      <div className="courses-stats">
        <div className="stats-summary">
          <div className="summary-item">
            <span className="summary-number">{courseStats.totalCount}</span>
            <span className="summary-label">门课程</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">{filteredCourses.length}</span>
            <span className="summary-label">当前显示</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">{courseStats.freeCount}</span>
            <span className="summary-label">免费课程</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">{courseStats.totalStudents}</span>
            <span className="summary-label">总学员</span>
          </div>
        </div>
      </div>

      <motion.div 
        className="courses-grid"
        layout
      >
        <AnimatePresence mode="wait">
          {filteredCourses.map((course, index) => (
            <motion.div 
              key={course.id} 
              className={`course-card ${course.type}-course clickable neon-glow hologram`} 
              onClick={() => handleCourseCardClick(course)}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              custom={index}
              transition={{ delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                boxShadow: '0 25px 50px rgba(14, 165, 233, 0.25)',
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
            <img src={course.image} alt={course.title} />
            <div className="course-content">
              <div className="course-category">{course.category}</div>
              {course.badge && (
                <div className={`course-badge ${course.type}`}>{course.badge}</div>
              )}
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              
              {course.features && (
                <div className="course-features">
                  {course.features.map((feature, index) => (
                    <span key={index} className="course-feature-tag">{feature}</span>
                  ))}
                </div>
              )}
              
              <div className="course-stats">
                <span className="rating">⭐ {course.rating}</span>
                <span className="students">👥 {course.students} 学员</span>
              </div>
              <div className="course-footer">
                <span className={`price ${course.price === 0 || course.price === 'VIP免费' ? 'free' : 'paid'}`}>
                  {course.price === 0 ? '免费' : 
                   course.price === 'VIP免费' ? 'VIP免费' : 
                   `￥${course.price}`}
                </span>
                <motion.button 
                  className="btn-primary enroll-btn" 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEnrollCourse(course)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {course.price === 0 ? '🆓 免费学习' :
                   course.price === 'VIP免费' ? '🎯 立即学习' :
                   '💎 立即报名'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default Courses
