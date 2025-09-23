import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Courses.css'

const Courses = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const handleEnrollCourse = (courseTitle) => {
    alert(`感谢您的兴趣！"${courseTitle}" 报名功能正在开发中。\n请通过联系我们页面了解更多信息。`)
    navigate('/contact')
  }

  const courses = [
    {
      id: 1,
      title: 'React 基础入门',
      category: '前端开发',
      price: 199,
      students: 1245,
      rating: 4.8,
      image: 'https://via.placeholder.com/300x200?text=React+基础',
      description: '从零开始学习React，掌握现代前端开发'
    },
    {
      id: 2,
      title: 'Vue.js 完整教程',
      category: '前端开发',
      price: 229,
      students: 987,
      rating: 4.7,
      image: 'https://via.placeholder.com/300x200?text=Vue.js+教程',
      description: '深入学习Vue.js框架及其生态系统'
    },
    {
      id: 3,
      title: 'Node.js 后端开发',
      category: '后端开发',
      price: 299,
      students: 756,
      rating: 4.9,
      image: 'https://via.placeholder.com/300x200?text=Node.js+后端',
      description: '使用Node.js构建强大的后端应用'
    },
    {
      id: 4,
      title: 'MySQL 数据库管理',
      category: '数据库',
      price: 249,
      students: 623,
      rating: 4.6,
      image: 'https://via.placeholder.com/300x200?text=MySQL+数据库',
      description: '掌握MySQL数据库设计和优化技巧'
    },
    {
      id: 5,
      title: 'Python 数据分析',
      category: '数据科学',
      price: 349,
      students: 892,
      rating: 4.8,
      image: 'https://via.placeholder.com/300x200?text=Python+数据分析',
      description: '使用Python进行数据分析和可视化'
    },
    {
      id: 6,
      title: '机器学习基础',
      category: '数据科学',
      price: 399,
      students: 534,
      rating: 4.7,
      image: 'https://via.placeholder.com/300x200?text=机器学习',
      description: '入门机器学习算法和实践应用'
    }
  ]

  const categories = ['全部', '前端开发', '后端开发', '数据库', '数据科学']

  const filteredCourses = selectedCategory === '全部' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory)

  return (
    <div className="courses">
      <div className="courses-header">
        <h1>全部课程</h1>
        <p>选择适合您的课程，开启学习之旅</p>
      </div>

      <div className="filter-section">
        <h3>课程分类</h3>
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.title} />
            <div className="course-content">
              <div className="course-category">{course.category}</div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-stats">
                <span className="rating">⭐ {course.rating}</span>
                <span className="students">👥 {course.students} 学员</span>
              </div>
              <div className="course-footer">
                <span className="price">￥{course.price}</span>
                <button className="btn-primary enroll-btn" onClick={() => handleEnrollCourse(course.title)}>立即报名</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Courses
