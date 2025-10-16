import React from 'react'
import './CourseCard.css'

const CourseCard = ({ course, onSelect, onPurchase, canWatch, isLoggedIn, userType }) => {
  const handleCardClick = () => {
    if (canWatch) {
      onSelect(course)
    } else {
      // 如果不能观看，提示需要购买或登录
      if (!isLoggedIn) {
        alert('请先登录后观看课程')
      } else {
        alert(`该课程为付费内容，需要购买后观看\n价格：￥${course.price}`)
      }
    }
  }

  const handlePurchaseClick = (e) => {
    e.stopPropagation() // 防止触发卡片点击事件
    onPurchase(course)
  }

  return (
    <div className={`course-card ${!canWatch && !course.isFree ? 'locked' : ''}`}>
      <div className="course-thumbnail" onClick={handleCardClick}>
        <img src={course.thumbnail} alt={course.title} />
        <div className="course-overlay">
          <div className="play-button">
            {canWatch ? '▶️ 播放' : '🔒 需要解锁'}
          </div>
        </div>
        {!course.isFree && (
          <div className="course-type-badge premium">
            💎 付费课程
          </div>
        )}
        {course.isFree && (
          <div className="course-type-badge free">
            🆓 免费课程
          </div>
        )}
        <div className="course-duration">
          ⏱️ {course.duration}
        </div>
      </div>

      <div className="course-info">
        <h4 className="course-title">{course.title}</h4>
        <p className="course-description">{course.description}</p>
        
        {/* 竞赛框架标签 */}
        {course.framework && (
          <div className="course-framework">
            <span className={`framework-badge ${course.framework.toLowerCase().replace('-', '')}`}>
              {course.framework === 'GESP' && '🎯 GESP考级'}
              {course.framework === 'CSP-J' && '🥉 CSP入门组'}
              {course.framework === 'CSP-S' && '🥈 CSP提高组'}
              {course.framework === 'NOIP' && '🏆 NOIP奥赛'}
            </span>
            <span className="level-badge">{course.level}</span>
          </div>
        )}

        <div className="course-actions">
          {course.isFree ? (
            <button 
              className="btn-primary course-btn"
              onClick={handleCardClick}
            >
              🆓 免费观看
            </button>
          ) : (
            <div className="premium-actions">
              {canWatch ? (
                <button 
                  className="btn-primary course-btn"
                  onClick={handleCardClick}
                >
                  {userType === 'vip' ? '👑 VIP观看' : '✅ 已购买'}
                </button>
              ) : (
                <>
                  <div className="course-price">
                    ￥{course.price}
                  </div>
                  <button 
                    className="btn-warning purchase-btn"
                    onClick={handlePurchaseClick}
                    disabled={!isLoggedIn}
                  >
                    {isLoggedIn ? '🛒 立即购买' : '🔐 请先登录'}
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {userType !== 'vip' && !course.isFree && (
          <div className="vip-tip">
            <span>💡 成为VIP用户可免费观看所有付费课程</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseCard
