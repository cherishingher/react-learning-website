import React from 'react'
import './GESPLevelSelector.css'

const GESPLevelSelector = ({ 
  level, 
  language, 
  onSelect, 
  isHovered, 
  onHover, 
  onLeave, 
  userLevel 
}) => {
  const isCompleted = userLevel >= level.level
  const isCurrentLevel = userLevel + 1 === level.level
  const isLocked = level.level > userLevel + 2

  const getCardStatus = () => {
    if (isCompleted) return 'completed'
    if (isCurrentLevel) return 'current'
    if (isLocked) return 'locked'
    return 'available'
  }

  return (
    <div 
      className={`gesp-level-selector ${getCardStatus()} ${isHovered ? 'hovered' : ''}`}
      onClick={!isLocked ? onSelect : undefined}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="selector-card">
        <div className="level-badge" style={{ backgroundColor: level.color }}>
          <div className="level-icon">{level.icon}</div>
          <div className="level-number">{level.level}</div>
        </div>

        <div className="level-info">
          <h4 className="level-title">{level.name}</h4>
          <p className="level-subtitle">{level.subtitle}</p>
          
          <div className="level-meta">
            <div className="meta-item">
              <span className="meta-label">难度</span>
              <span className="meta-value">{level.difficulty}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">年龄</span>
              <span className="meta-value">{level.ageRange}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">周期</span>
              <span className="meta-value">{level.duration}</span>
            </div>
          </div>

          <div className="level-description">
            <p>{level.description}</p>
          </div>

          <div className="level-stats">
            <div className="stat-item">
              <span className="stat-number">11</span>
              <span className="stat-label">次考试</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">66</span>
              <span className="stat-label">个视频</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">已上传</span>
            </div>
          </div>
        </div>

        <div className="selector-footer">
          {isLocked ? (
            <div className="locked-indicator">
              <span className="lock-icon">🔒</span>
              <span className="lock-text">需完成前置等级</span>
            </div>
          ) : (
            <div className="action-area">
              {isCompleted && <div className="completed-badge">✅ 已完成</div>}
              {isCurrentLevel && <div className="current-badge">🎯 推荐学习</div>}
              
              <button 
                className="enter-btn"
                style={{ backgroundColor: level.color }}
                onClick={onSelect}
              >
                🚀 进入{level.level}级
              </button>
            </div>
          )}
        </div>

        <div className="hover-overlay">
          <div className="hover-content">
            <h5>📚 即将学习</h5>
            <ul>
              <li>• {language.name}编程基础</li>
              <li>• 第1-11次考试真题讲解</li>
              <li>• 完整的学习路径规划</li>
              <li>• 专业的解题技巧指导</li>
            </ul>
            <div className="hover-cta">
              点击进入 {level.name} →
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GESPLevelSelector








