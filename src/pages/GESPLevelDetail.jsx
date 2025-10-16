import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './GESPLevelDetail.css'

const GESPLevelDetail = () => {
  const navigate = useNavigate()
  const { language, levelId } = useParams()
  const { user, isLoggedIn } = useUser()
  const [activeTab, setActiveTab] = useState('overview')

  // 提取级别数字
  const levelNumber = parseInt(levelId?.replace('level', '') || '1')

  // 语言配置
  const languageConfig = {
    cpp: { name: 'C++编程', icon: '⚡', color: '#00599C' },
    python: { name: 'Python编程', icon: '🐍', color: '#3776AB' },
    scratch: { name: 'Scratch编程', icon: '🎨', color: '#FF6B35' }
  }

  // 级别相关的辅助函数
  const getLevelColor = (level) => {
    const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#E91E63', '#FF5722', '#673AB7', '#F44336']
    return colors[level - 1] || '#6c757d'
  }

  const getLevelIcon = (level) => {
    const icons = ['🌱', '🧩', '🎯', '💻', '⚡', '🏅', '🚀', '👑']
    return icons[level - 1] || '📚'
  }

  const getLevelDescription = (level) => {
    const descriptions = [
      '编程思维启蒙，培养基础逻辑思维能力',
      '进一步发展逻辑思维，掌握基本编程概念', 
      '培养算法思维，掌握基础数据结构概念',
      '掌握程序设计基本功，培养结构化编程思维',
      '深入学习高级算法，培养竞赛编程能力',
      '达到初级竞赛水平，为CSP-J做准备',
      '达到中级竞赛水平，具备CSP-S参赛能力',
      '达到精英竞赛水平，具备NOIP金牌实力'
    ]
    return descriptions[level - 1] || '编程能力培养'
  }

  const getLevelHours = (level) => {
    const hours = [20, 30, 40, 50, 60, 70, 80, 100]
    return hours[level - 1] || 50
  }

  const currentLanguage = languageConfig[language]
  
  // 检查语言是否有效
  if (!currentLanguage) {
    return (
      <div className="level-not-found">
        <h1>编程语言未找到</h1>
        <p>抱歉，您访问的编程语言 "{language}" 不存在。</p>
        <button className="btn-primary" onClick={() => navigate('/gesp')}>
          返回GESP主页
        </button>
      </div>
    )
  }

  // 检查级别是否有效
  if (isNaN(levelNumber) || levelNumber < 1 || levelNumber > 8) {
    return (
      <div className="level-not-found">
        <h1>级别不存在</h1>
        <p>GESP级别范围为1-8级，当前访问级别：{levelId}</p>
        <button className="btn-primary" onClick={() => navigate(`/gesp/${language}`)}>
          返回级别选择
        </button>
      </div>
    )
  }
  
  // 级别详细数据
  const levelData = {
    level: levelNumber,
    name: `GESP${levelNumber}级`,
    language: currentLanguage.name,
    color: getLevelColor(levelNumber),
    icon: getLevelIcon(levelNumber),
    description: getLevelDescription(levelNumber),
    totalExams: 11,
    totalVideos: 66,
    uploadedVideos: 0,
    estimatedHours: getLevelHours(levelNumber)
  }

  const handleBackToLanguage = () => {
    navigate(`/gesp/${language}`)
  }

  const handleBackToGESP = () => {
    navigate('/gesp')
  }

  return (
    <div className="gesp-level-detail">
      <div className="level-hero" style={{ background: `linear-gradient(135deg, ${currentLanguage.color}, ${currentLanguage.color}cc)` }}>
        <div className="hero-content">
          <div className="breadcrumb">
            <button className="breadcrumb-btn" onClick={handleBackToGESP}>
              GESP考级
            </button>
            <span className="breadcrumb-separator">→</span>
            <button className="breadcrumb-btn" onClick={handleBackToLanguage}>
              {currentLanguage.name}
            </button>
            <span className="breadcrumb-separator">→</span>
            <span className="breadcrumb-current">{levelData.name}</span>
          </div>

          <div className="level-title-section">
            <div className="level-icon-large" style={{ backgroundColor: levelData.color }}>
              {levelData.icon}
            </div>
            <div className="level-title-info">
              <h1>{currentLanguage.name} - {levelData.name}</h1>
              <p>{levelData.description}</p>
              
              <div className="level-summary-stats">
                <div className="summary-stat">
                  <span className="stat-number">{levelData.totalExams}</span>
                  <span className="stat-label">次考试</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-number">{levelData.totalVideos}</span>
                  <span className="stat-label">个视频</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-number">{levelData.estimatedHours}h</span>
                  <span className="stat-label">学习时长</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-number">{Math.round((levelData.uploadedVideos / levelData.totalVideos) * 100)}%</span>
                  <span className="stat-label">内容完成</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="level-content">
        <div className="content-tabs">
          <button 
            className={`content-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 级别概览
          </button>
          <button 
            className={`content-tab ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            📹 考试视频
          </button>
          <button 
            className={`content-tab ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            📈 学习进度
          </button>
          {user?.isAdmin && (
            <button 
              className={`content-tab ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              🛠️ 管理后台
            </button>
          )}
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <div className="level-framework">
                <h2>🎯 {levelData.name} 能力框架</h2>
                <div className="framework-grid">
                  <div className="framework-card skills">
                    <h3>🧠 核心技能</h3>
                    <div className="skills-placeholder">
                      <p>您可在此处填充该级别的核心技能要求：</p>
                      <ul>
                        <li>• 技能点1：具体技能描述</li>
                        <li>• 技能点2：具体技能描述</li>
                        <li>• 技能点3：具体技能描述</li>
                        <li>• 技能点4：具体技能描述</li>
                      </ul>
                    </div>
                  </div>

                  <div className="framework-card objectives">
                    <h3>🎓 学习目标</h3>
                    <div className="objectives-placeholder">
                      <p>您可在此处填充该级别的学习目标：</p>
                      <ul>
                        <li>• 目标1：具体学习目标</li>
                        <li>• 目标2：具体学习目标</li>
                        <li>• 目标3：具体学习目标</li>
                        <li>• 目标4：具体学习目标</li>
                      </ul>
                    </div>
                  </div>

                  <div className="framework-card assessment">
                    <h3>📋 评估标准</h3>
                    <div className="assessment-placeholder">
                      <p>您可在此处填充该级别的评估标准：</p>
                      <ul>
                        <li>• 标准1：具体评估要求</li>
                        <li>• 标准2：具体评估要求</li>
                        <li>• 标准3：具体评估要求</li>
                        <li>• 标准4：具体评估要求</li>
                      </ul>
                    </div>
                  </div>

                  <div className="framework-card structure">
                    <h3>📚 课程结构</h3>
                    <div className="structure-stats">
                      <div className="structure-stat">
                        <span className="stat-number">{levelData.estimatedHours}</span>
                        <span className="stat-label">总学时</span>
                      </div>
                      <div className="structure-stat">
                        <span className="stat-number">{Math.ceil(levelData.estimatedHours * 0.6)}</span>
                        <span className="stat-label">理论课时</span>
                      </div>
                      <div className="structure-stat">
                        <span className="stat-number">{Math.floor(levelData.estimatedHours * 0.4)}</span>
                        <span className="stat-label">实践课时</span>
                      </div>
                      <div className="structure-stat">
                        <span className="stat-number">{levelNumber * 2}</span>
                        <span className="stat-label">练习项目</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="videos-section">
              <div className="videos-intro">
                <h2>📹 {levelData.name} 考试讲解视频</h2>
                <p>第1次到第11次考试的完整真题讲解，每次考试包含6个精讲视频</p>
                
                <div className="videos-stats">
                  <div className="stat-card">
                    <span className="stat-number">{levelData.totalExams}</span>
                    <span className="stat-label">次考试</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">{levelData.totalVideos}</span>
                    <span className="stat-label">个视频</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">{levelData.uploadedVideos}</span>
                    <span className="stat-label">已上传</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">{Math.round((levelData.uploadedVideos / levelData.totalVideos) * 100)}%</span>
                    <span className="stat-label">完成度</span>
                  </div>
                </div>
              </div>

              <div className="video-upload-area">
                <div className="upload-info">
                  <h3>📤 视频内容框架已准备就绪</h3>
                  <p>每次考试包含以下6个视频框架，您可以上传对应的教学内容：</p>
                  
                  <div className="video-structure-preview">
                    <div className="video-type">📋 考试概览 (15-20分钟)</div>
                    <div className="video-type">🧮 第1题详解 (8-12分钟)</div>
                    <div className="video-type">🧮 第2题详解 (12-18分钟)</div>
                    <div className="video-type">🧮 第3题详解 (15-25分钟)</div>
                    <div className="video-type">🧮 第4题详解 (20-30分钟)</div>
                    <div className="video-type">📝 考试总结 (10-15分钟)</div>
                  </div>
                  
                  <div className="upload-instructions">
                    <h4>📝 上传说明</h4>
                    <p>第1次到第11次考试的视频框架已创建完成，您可以：</p>
                    <ul>
                      <li>• 准备每次考试的真题讲解视频</li>
                      <li>• 按照框架结构上传对应内容</li>
                      <li>• 填写详细的视频信息和知识点</li>
                      <li>• 设置合适的难度级别和时长</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="progress-section">
              <h2>📈 学习进度追踪</h2>
              
              {isLoggedIn ? (
                <div className="progress-content">
                  <div className="user-progress">
                    <h3>👤 个人学习进度</h3>
                    <div className="progress-overview">
                      <div className="progress-item">
                        <span className="progress-label">观看进度</span>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '0%' }}></div>
                        </div>
                        <span className="progress-text">0/{levelData.totalVideos} 已观看</span>
                      </div>
                      
                      <div className="progress-item">
                        <span className="progress-label">学习时长</span>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '0%' }}></div>
                        </div>
                        <span className="progress-text">0/{levelData.estimatedHours}小时</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="login-required">
                  <div className="login-prompt">
                    <h3>🔐 需要登录查看学习进度</h3>
                    <p>登录后可以跟踪您的学习进度，记录观看历史，获得学习成就</p>
                    <button className="btn-primary" onClick={() => navigate('/login')}>
                      立即登录
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'admin' && user?.isAdmin && (
            <div className="admin-section">
              <h2>🛠️ {levelData.name} 管理后台</h2>
              <div className="admin-overview">
                <div className="admin-stats-summary">
                  <h3>📊 级别统计概览</h3>
                  <div className="admin-stats-grid">
                    <div className="admin-stat-card">
                      <span className="stat-number">{levelData.uploadedVideos}</span>
                      <span className="stat-label">已上传视频</span>
                    </div>
                    <div className="admin-stat-card">
                      <span className="stat-number">{levelData.totalVideos - levelData.uploadedVideos}</span>
                      <span className="stat-label">待上传视频</span>
                    </div>
                    <div className="admin-stat-card">
                      <span className="stat-number">0</span>
                      <span className="stat-label">学习用户数</span>
                    </div>
                    <div className="admin-stat-card">
                      <span className="stat-number">0</span>
                      <span className="stat-label">平均完成率</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="level-navigation">
          <div className="nav-section">
            <h3>🧭 级别导航</h3>
            <div className="level-nav-buttons">
              {levelNumber > 1 && (
                <button 
                  className="nav-btn prev"
                  onClick={() => navigate(`/gesp/${language}/level${levelNumber - 1}`)}
                >
                  ← {levelNumber - 1}级
                </button>
              )}
              
              <button 
                className="nav-btn current"
                style={{ backgroundColor: levelData.color }}
              >
                {levelData.icon} {levelNumber}级
              </button>

              {levelNumber < 8 && (
                <button 
                  className="nav-btn next"
                  onClick={() => navigate(`/gesp/${language}/level${levelNumber + 1}`)}
                >
                  {levelNumber + 1}级 →
                </button>
              )}
            </div>
          </div>

          <div className="quick-actions">
            <button 
              className="btn-primary action-btn"
              onClick={() => setActiveTab('videos')}
            >
              🎥 查看考试视频框架
            </button>
            <button 
              className="btn-secondary action-btn"
              onClick={() => navigate(`/learning`)}
            >
              📚 相关练习课程
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GESPLevelDetail