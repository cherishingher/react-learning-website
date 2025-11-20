import React, { useState, useContext, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import CourseCard from '../components/CourseCard'
import CompetitionFilter from '../components/CompetitionFilter'
import UserContext from '../context/UserContext'
import './Learning.css'
import HeroStats from '../components/HeroStats'

const Learning = () => {
  const navigate = useNavigate()
  const { user, isLoggedIn } = useContext(UserContext)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedFramework, setSelectedFramework] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const COURSES_PER_PAGE = 9

  // 课程数据 - 实际项目中应该从API获取
  const courses = {
    scratch: {
      name: 'Scratch编程',
      icon: '🎨',
      color: '#FF6B35',
      free: [
        {
          id: 'scratch-001',
          title: 'Scratch基础入门',
          duration: '15:30',
          description: '学习Scratch界面和基本概念',
          thumbnail: 'https://via.placeholder.com/320x180/FF6B35/white?text=Scratch+基础',
          videoUrl: 'placeholder-video-1',
          isFree: true
        },
        {
          id: 'scratch-002',
          title: '第一个动画程序',
          duration: '22:15',
          description: '创建简单的动画效果',
          thumbnail: 'https://via.placeholder.com/320x180/FF6B35/white?text=动画程序',
          videoUrl: 'placeholder-video-2',
          isFree: true
        },
        {
          id: 'scratch-003',
          title: '角色和舞台设计',
          duration: '18:45',
          description: '学习角色创建和舞台布置',
          thumbnail: 'https://via.placeholder.com/320x180/FF6B35/white?text=角色设计',
          videoUrl: 'placeholder-video-3',
          isFree: true
        }
      ],
      premium: [
        {
          id: 'scratch-101',
          title: 'Scratch高级编程技巧',
          duration: '35:20',
          description: '深入学习Scratch高级功能',
          thumbnail: 'https://via.placeholder.com/320x180/FF6B35/white?text=高级技巧',
          videoUrl: 'placeholder-video-4',
          isFree: false,
          price: 29.9
        },
        {
          id: 'scratch-102',
          title: '游戏开发实战项目',
          duration: '45:10',
          description: '完整开发一个小游戏',
          thumbnail: 'https://via.placeholder.com/320x180/FF6B35/white?text=游戏开发',
          videoUrl: 'placeholder-video-5',
          isFree: false,
          price: 39.9
        },
        {
          id: 'scratch-103',
          title: 'Scratch创意编程挑战',
          duration: '28:30',
          description: '挑战性的创意编程项目',
          thumbnail: 'https://via.placeholder.com/320x180/FF6B35/white?text=创意挑战',
          videoUrl: 'placeholder-video-6',
          isFree: false,
          price: 34.9
        }
      ]
    },
    python: {
      name: 'Python编程',
      icon: '🐍',
      color: '#3776AB',
      free: [
        {
          id: 'python-001',
          title: 'Python环境搭建',
          duration: '12:20',
          description: '安装Python和开发环境',
          thumbnail: 'https://via.placeholder.com/320x180/3776AB/white?text=环境搭建',
          videoUrl: 'placeholder-video-7',
          isFree: true
        },
        {
          id: 'python-002',
          title: '变量和数据类型',
          duration: '20:15',
          description: 'Python基础语法学习',
          thumbnail: 'https://via.placeholder.com/320x180/3776AB/white?text=基础语法',
          videoUrl: 'placeholder-video-8',
          isFree: true
        },
        {
          id: 'python-003',
          title: '条件语句和循环',
          duration: '25:40',
          description: '控制流程的使用方法',
          thumbnail: 'https://via.placeholder.com/320x180/3776AB/white?text=控制流程',
          videoUrl: 'placeholder-video-9',
          isFree: true
        }
      ],
      premium: [
        {
          id: 'python-101',
          title: 'Python面向对象编程',
          duration: '42:30',
          description: '深入学习类和对象',
          thumbnail: 'https://via.placeholder.com/320x180/3776AB/white?text=面向对象',
          videoUrl: 'placeholder-video-10',
          isFree: false,
          price: 49.9
        },
        {
          id: 'python-102',
          title: 'Python数据分析入门',
          duration: '38:15',
          description: '使用pandas进行数据处理',
          thumbnail: 'https://via.placeholder.com/320x180/3776AB/white?text=数据分析',
          videoUrl: 'placeholder-video-11',
          isFree: false,
          price: 59.9
        },
        {
          id: 'python-103',
          title: 'Python网络爬虫实战',
          duration: '50:45',
          description: '学习网络数据抓取技术',
          thumbnail: 'https://via.placeholder.com/320x180/3776AB/white?text=网络爬虫',
          videoUrl: 'placeholder-video-12',
          isFree: false,
          price: 69.9
        }
      ]
    },
    cpp: {
      name: 'C++编程',
      icon: '⚡',
      color: '#00599C',
      free: [
        {
          id: 'cpp-001',
          title: 'C++开发环境配置',
          duration: '16:25',
          description: 'IDE安装和项目创建',
          thumbnail: 'https://via.placeholder.com/320x180/00599C/white?text=环境配置',
          videoUrl: 'placeholder-video-13',
          isFree: true
        },
        {
          id: 'cpp-002',
          title: 'C++基础语法',
          duration: '28:10',
          description: '变量、函数和基本语法',
          thumbnail: 'https://via.placeholder.com/320x180/00599C/white?text=基础语法',
          videoUrl: 'placeholder-video-14',
          isFree: true
        },
        {
          id: 'cpp-003',
          title: '数组和指针基础',
          duration: '32:50',
          description: '内存管理和指针操作',
          thumbnail: 'https://via.placeholder.com/320x180/00599C/white?text=数组指针',
          videoUrl: 'placeholder-video-15',
          isFree: true
        }
      ],
      premium: [
        // GESP考级系列课程
        {
          id: 'cpp-gesp-101',
          title: 'GESP考级 - 1级到3级全攻略',
          duration: '42:30',
          description: 'GESP青少年软件编程等级考试完整备考指南',
          thumbnail: 'https://via.placeholder.com/320x180/FF6B35/white?text=GESP考级',
          videoUrl: 'gesp-level-123',
          isFree: false,
          price: 199.9,
          framework: 'GESP',
          level: '初级',
          tags: ['考级', '认证', '基础']
        },
        {
          id: 'cpp-gesp-102', 
          title: 'GESP考级 - 4级到6级进阶',
          duration: '55:20',
          description: 'GESP高级别考试技巧和真题解析',
          thumbnail: 'https://via.placeholder.com/320x180/FF6B35/white?text=GESP高级',
          videoUrl: 'gesp-level-456',
          isFree: false,
          price: 299.9,
          framework: 'GESP',
          level: '高级',
          tags: ['考级', '认证', '进阶']
        },
        
        // CSP入门组系列课程
        {
          id: 'cpp-csp-j-101',
          title: 'CSP-J入门组 - 基础算法专训',
          duration: '48:15',
          description: 'CSP-J考试必备的基础算法和数据结构',
          thumbnail: 'https://via.placeholder.com/320x180/4ECDC4/white?text=CSP-J基础',
          videoUrl: 'csp-j-basic',
          isFree: false,
          price: 249.9,
          framework: 'CSP-J',
          level: '入门',
          tags: ['竞赛', '算法', '入门组']
        },
        {
          id: 'cpp-csp-j-102',
          title: 'CSP-J入门组 - 真题详解与模拟',
          duration: '52:40',
          description: 'CSP-J历年真题分析和模拟考试训练',
          thumbnail: 'https://via.placeholder.com/320x180/4ECDC4/white?text=CSP-J真题',
          videoUrl: 'csp-j-practice',
          isFree: false,
          price: 279.9,
          framework: 'CSP-J',
          level: '强化',
          tags: ['竞赛', '真题', '模拟']
        },
        
        // CSP提高组系列课程
        {
          id: 'cpp-csp-s-101',
          title: 'CSP-S提高组 - 高级算法突破',
          duration: '58:30',
          description: 'CSP-S考试所需的高级算法和优化技巧',
          thumbnail: 'https://via.placeholder.com/320x180/E74C3C/white?text=CSP-S算法',
          videoUrl: 'csp-s-advanced',
          isFree: false,
          price: 399.9,
          framework: 'CSP-S',
          level: '提高',
          tags: ['竞赛', '高级算法', '提高组']
        },
        {
          id: 'cpp-csp-s-102',
          title: 'CSP-S提高组 - 图论与动态规划',
          duration: '62:15',
          description: '深入学习图论算法和动态规划解题技巧',
          thumbnail: 'https://via.placeholder.com/320x180/E74C3C/white?text=图论DP',
          videoUrl: 'csp-s-graph-dp',
          isFree: false,
          price: 449.9,
          framework: 'CSP-S',
          level: '高级',
          tags: ['竞赛', '图论', '动态规划']
        },
        
        // NOIP系列课程
        {
          id: 'cpp-noip-101',
          title: 'NOIP竞赛 - 算法思维训练',
          duration: '65:45',
          description: 'NOIP信息学奥赛的算法思维和解题策略',
          thumbnail: 'https://via.placeholder.com/320x180/9B59B6/white?text=NOIP思维',
          videoUrl: 'noip-thinking',
          isFree: false,
          price: 499.9,
          framework: 'NOIP',
          level: '竞赛',
          tags: ['奥赛', '算法思维', '策略']
        },
        {
          id: 'cpp-noip-102',
          title: 'NOIP竞赛 - 经典题型精讲',
          duration: '72:20',
          description: 'NOIP历年经典题型分析和解题方法',
          thumbnail: 'https://via.placeholder.com/320x180/9B59B6/white?text=NOIP题型',
          videoUrl: 'noip-classic',
          isFree: false,
          price: 549.9,
          framework: 'NOIP',
          level: '精通',
          tags: ['奥赛', '经典题型', '精讲']
        },
        {
          id: 'cpp-noip-103',
          title: 'NOIP竞赛 - 冲刺班特训',
          duration: '80:10',
          description: 'NOIP考前冲刺训练和实战模拟',
          thumbnail: 'https://via.placeholder.com/320x180/9B59B6/white?text=NOIP冲刺',
          videoUrl: 'noip-sprint',
          isFree: false,
          price: 599.9,
          framework: 'NOIP',
          level: '冲刺',
          tags: ['奥赛', '冲刺', '实战']
        }
      ]
    }
  }

  // 获取当前选择分类的课程
  const getCurrentCourses = () => {
    let coursesToShow = []
    
    if (selectedCategory === 'all') {
      Object.values(courses).forEach(category => {
        coursesToShow.push(...category.free, ...category.premium)
      })
    } else {
      coursesToShow = [...courses[selectedCategory].free, ...courses[selectedCategory].premium]
    }
    
    // 如果是C++分类且选择了特定竞赛框架，进行进一步筛选
    if (selectedCategory === 'cpp' && selectedFramework !== 'all') {
      coursesToShow = coursesToShow.filter(course => 
        course.isFree || course.framework === selectedFramework
      )
    }
    
    return coursesToShow
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedFramework])

  const handleFrameworkFilter = (framework) => {
    setSelectedFramework(framework)
  }

  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
  }

  const handlePurchase = (course) => {
    if (!isLoggedIn) {
      alert('请先登录后再购买课程')
      navigate('/login')
      return
    }
    // 这里应该跳转到支付页面
    alert(`购买课程：${course.title}，价格：￥${course.price}`)
  }

  const canWatchPremium = (course) => {
    if (course.isFree) return true
    if (!isLoggedIn) return false
    return user?.isVip || user?.purchasedCourses?.includes(course.id)
  }

  const currentCourses = getCurrentCourses()
  const totalCourses = currentCourses.length
  const totalPages = Math.max(1, Math.ceil(totalCourses / COURSES_PER_PAGE))
  const paginatedCourses = currentCourses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  )
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  const freeCourseCount = useMemo(
    () => currentCourses.filter((course) => course.isFree).length,
    [currentCourses]
  )
  const vipCourseCount = totalCourses - freeCourseCount

  const learningStats = useMemo(
    () => [
      { value: `${totalCourses}`, label: '\u603b\u8bfe\u7a0b' },
      { value: `${freeCourseCount}`, label: '\u514d\u8d39\u5185\u5bb9' },
      { value: `${Math.max(vipCourseCount, 0)}`, label: 'VIP\u4f18\u60e0' }
    ],
    [totalCourses, freeCourseCount, vipCourseCount]
  )

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  return (
    <div className="learning" style={{ position: 'relative' }}>
      <div className="learning-hero" style={{ position: 'relative' }}>
        <div className="hero-content">
          <h1>在线学习中心</h1>
          <p>掌握编程技能，开启技术人生</p>
          {!isLoggedIn && (
            <div className="login-prompt">
              <p>登录后享受更多学习功能</p>
              <button className="btn-primary" onClick={() => navigate('/login')}>
                立即登录
              </button>
            </div>
          )}
          
          <div className="hero-features">
            <button 
              className="feature-btn"
              onClick={() => navigate('/gesp')}
            >
              🏆 GESP考级认证
            </button>
          </div>
          {isLoggedIn && (
            <div className="user-welcome">
              <p>欢迎回来，{user?.name}！</p>
              {user?.isVip ? (
                <span className="vip-badge">👑 VIP用户</span>
              ) : (
                <button className="btn-secondary" onClick={() => navigate('/vip')}>
                  升级VIP
                </button>
              )}
            </div>
          )}
          <HeroStats stats={learningStats} />
        </div>
      </div>

      <div className="learning-content">
        <div className="course-categories">
          <h2>课程分类</h2>
          <div className="category-tabs">
            <button 
              className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              📚 全部课程
            </button>
            {Object.entries(courses).map(([key, category]) => (
            <button
              key={key}
              className={`category-tab ${selectedCategory === key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(key)}
              style={{ borderColor: category.color }}
            >
              {category.icon} {category.name}
              {key === 'cpp' && (
                <span className="gesp-link" onClick={(e) => {
                  e.stopPropagation()
                  navigate('/gesp')
                }}>
                  🎯 GESP考级
                </span>
              )}
            </button>
            ))}
          </div>
        </div>

        {/* C++竞赛分类筛选器 */}
        {selectedCategory === 'cpp' && (
          <CompetitionFilter
            courses={currentCourses}
            onFilterChange={handleFrameworkFilter}
            selectedFramework={selectedFramework}
          />
        )}

        <div className="courses-grid">
          <div className="courses-section">
            <div className="section-header">
              <h3>
                {selectedCategory === 'all' ? '全部课程' : courses[selectedCategory]?.name}
                {selectedCategory === 'cpp' && selectedFramework !== 'all' && (
                  <span className="framework-label">
                    {selectedFramework === 'GESP' && '🎯 GESP考级'}
                    {selectedFramework === 'CSP-J' && '🥉 CSP入门组'}
                    {selectedFramework === 'CSP-S' && '🥈 CSP提高组'}
                    {selectedFramework === 'NOIP' && '🏆 NOIP奥赛'}
                  </span>
                )}
              </h3>
              <div className="course-count">
                共 {totalCourses} 门课程
                {totalPages > 1 && (
                  <span className="page-indicator">第 {currentPage}/{totalPages} 页</span>
                )}
              </div>
            </div>

            <div className="courses-list">
              {paginatedCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onSelect={handleCourseSelect}
                  onPurchase={handlePurchase}
                  canWatch={canWatchPremium(course)}
                  isLoggedIn={isLoggedIn}
                  userType={user?.isVip ? 'vip' : 'normal'}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="courses-pagination">
                <button
                  className="page-button"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  上一页
                </button>
                <div className="page-numbers">
                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      className={`page-number ${number === currentPage ? 'active' : ''}`}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                <button
                  className="page-button"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  下一页
                </button>
                <div className="page-info">
                  第 {currentPage} / {totalPages} 页
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedCourse && (
          <VideoPlayer
            course={selectedCourse}
            canWatch={canWatchPremium(selectedCourse)}
            onClose={() => setSelectedCourse(null)}
            onPurchase={() => handlePurchase(selectedCourse)}
          />
        )}
      </div>
    </div>
  )
}

export default Learning
