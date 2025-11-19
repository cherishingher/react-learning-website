import React, { useState } from 'react'
import './GESPLevelCard.css'

const GESPLevelCard = ({ level, isSelected, onSelect, onStartLearning, isLoggedIn, userLevel }) => {
  const [showDetails, setShowDetails] = useState(false)

  const isLocked = level.level > userLevel + 1 && userLevel < level.level - 1
  const isCompleted = userLevel >= level.level
  const isCurrentLevel = userLevel + 1 === level.level

  const getCardStatus = () => {
    if (isCompleted) return 'completed'
    if (isCurrentLevel) return 'current'
    if (isLocked) return 'locked'
    return 'available'
  }

  const handleCardClick = () => {
    onSelect()
    setShowDetails(!showDetails)
  }

  const handleStartClick = (e) => {
    e.stopPropagation()
    onStartLearning()
  }

  return (
    <div className={`gesp-level-card ${getCardStatus()} ${isSelected ? 'selected' : ''}`}>
      <div className="level-card-header" onClick={handleCardClick}>
        <div className="level-icon" style={{ backgroundColor: level.color }}>
          {level.icon}
        </div>
        
        <div className="level-basic-info">
          <div className="level-number">第{level.level}级</div>
          <h3 className="level-name">{level.name}</h3>
          <p className="level-subtitle">{level.subtitle}</p>
        </div>

        <div className="level-meta">
          <div className="difficulty">{level.difficulty}</div>
          <div className="age-range">{level.ageRange}</div>
          <div className="duration">⏱️ {level.duration}</div>
        </div>

        <div className="level-status">
          {isCompleted && <span className="status-badge completed">✅ 已完成</span>}
          {isCurrentLevel && <span className="status-badge current">🎯 推荐学习</span>}
          {isLocked && <span className="status-badge locked">🔒 待解锁</span>}
        </div>

        <button className="expand-btn">
          {showDetails ? '▼' : '▶'}
        </button>
      </div>

      {showDetails && (
        <div className="level-card-details">
          <div className="level-description">
            <h4>📋 级别介绍</h4>
            <p>{level.description}</p>
          </div>

          <div className="level-requirements">
            <h4>📚 前置要求</h4>
            <p>{level.prerequisites}</p>
          </div>

          <div className="skills-framework">
            <h4>🎯 能力框架</h4>
            
            <div className="skills-section">
              <h5>核心技能</h5>
              <ul>
                {level.skillsFramework.coreSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="skills-section">
              <h5>学习目标</h5>
              <ul>
                {level.skillsFramework.learningObjectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>

            <div className="skills-section">
              <h5>评估标准</h5>
              <ul>
                {level.skillsFramework.assessmentCriteria.map((criteria, index) => (
                  <li key={index}>{criteria}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="course-structure">
            <h4>📊 课程结构</h4>
            <div className="structure-stats">
              <div className="stat-item">
                <span className="stat-number">{level.courseStructure.totalHours}</span>
                <span className="stat-label">总学时</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{level.courseStructure.videoLessons}</span>
                <span className="stat-label">视频课程</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{level.courseStructure.practiceProjects}</span>
                <span className="stat-label">实践项目</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{level.courseStructure.assessmentTasks}</span>
                <span className="stat-label">评估任务</span>
              </div>
            </div>
          </div>

          <div className="content-outline">
            <h4>📖 内容大纲</h4>
            <div className="modules-list">
              {level.contentOutline.map((module, index) => (
                <div key={index} className="module-item">
                  <div className="module-header">
                    <h5>{module.module}</h5>
                    <span className="module-hours">{module.hours}学时</span>
                  </div>
                  <div className="module-topics">
                    {module.topics.map((topic, topicIndex) => (
                      <span key={topicIndex} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                  <div className="content-placeholder">
                    <p>{module.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="level-actions">
            {isLocked ? (
              <div className="locked-message">
                <p>🔒 需要完成前置级别才能解锁</p>
                <span>建议先完成 GESP {level.level - 1}级</span>
              </div>
            ) : (
              <div className="action-buttons">
                <button 
                  className="btn-primary start-btn"
                  onClick={handleStartClick}
                  disabled={!isLoggedIn}
                >
                  {isCompleted ? '🔄 重新学习' : 
                   isCurrentLevel ? '🎯 开始学习' : '📚 进入学习'}
                </button>
                
                {!isLoggedIn && (
                  <p className="login-hint">💡 登录后可开始学习此级别</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default GESPLevelCard








