import React, { useState } from 'react'
import './ExamVideoCard.css'

const ExamVideoCard = ({ examData, isAdmin, onVideoUpload, onVideoPlay }) => {
  const [expanded, setExpanded] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploaded': return '#28a745'
      case 'processing': return '#ffc107'
      case 'pending': return '#6c757d'
      default: return '#6c757d'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'uploaded': return '✅ 已上传'
      case 'processing': return '⏳ 处理中'
      case 'pending': return '⏸️ 待上传'
      default: return '❓ 未知状态'
    }
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="exam-video-card">
      <div className="card-header" onClick={() => setExpanded(!expanded)}>
        <div className="exam-info">
          <h4>{examData.title}</h4>
          <p className="exam-subtitle">{examData.subtitle}</p>
          <div className="exam-metadata">
            <span className="exam-date">📅 {formatDate(examData.examDate)}</span>
            <span className="exam-difficulty">📊 {examData.difficulty}</span>
            <span className="exam-season">🗓️ {examData.season}季</span>
          </div>
        </div>

        <div className="upload-summary">
          <div className="progress-ring">
            <div className="progress-text">
              {Math.round((examData.statistics.uploadedVideos / examData.statistics.totalVideos) * 100)}%
            </div>
          </div>
          <p className="progress-label">
            {examData.statistics.uploadedVideos}/{examData.statistics.totalVideos} 已上传
          </p>
        </div>

        <button className="expand-toggle">
          {expanded ? '▼' : '▶'}
        </button>
      </div>

      {expanded && (
        <div className="card-content">
          <div className="video-structure">
            <h5>📹 视频结构框架</h5>
            
            {/* 考试概览视频 */}
            <div className="video-item overview-video">
              <div className="video-header">
                <span className="video-icon">📋</span>
                <span className="video-title">{examData.videoFramework.overview.title}</span>
                <span className="video-duration">{examData.videoFramework.overview.duration}</span>
                <span 
                  className="upload-status"
                  style={{ color: getStatusColor(examData.videoFramework.overview.uploadStatus) }}
                >
                  {getStatusText(examData.videoFramework.overview.uploadStatus)}
                </span>
              </div>
              
              <div className="video-content-framework">
                <p className="content-description">{examData.videoFramework.overview.content}</p>
                
                {isAdmin && (
                  <div className="admin-actions">
                    <button 
                      className="btn-upload"
                      onClick={() => onVideoUpload(examData.examId, 'overview')}
                    >
                      {examData.videoFramework.overview.uploadStatus === 'uploaded' ? '🔄 更新视频' : '📤 上传视频'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 各题讲解视频 */}
            <div className="problems-section">
              <h6>🧮 题目讲解视频</h6>
              <div className="problems-grid">
                {examData.videoFramework.problems.map((problem, index) => (
                  <div key={index} className="video-item problem-video">
                    <div className="video-header">
                      <span className="video-icon">📝</span>
                      <span className="video-title">第{problem.problemNumber}题</span>
                      <span className="difficulty-badge">{problem.difficulty}</span>
                      <span 
                        className="upload-status"
                        style={{ color: getStatusColor(problem.uploadStatus) }}
                      >
                        {getStatusText(problem.uploadStatus)}
                      </span>
                    </div>
                    
                    <div className="problem-details">
                      <div className="problem-duration">⏱️ {problem.duration}</div>
                      <div className="problem-topics">
                        {problem.topics.map((topic, topicIndex) => (
                          <span key={topicIndex} className="topic-tag">{topic}</span>
                        ))}
                      </div>
                    </div>

                    <div className="video-content-framework">
                      <p className="content-description">{problem.content}</p>
                      
                      {isAdmin && (
                        <div className="admin-actions">
                          <button 
                            className="btn-upload"
                            onClick={() => onVideoUpload(examData.examId, 'problem', problem.problemNumber)}
                          >
                            {problem.uploadStatus === 'uploaded' ? '🔄 更新视频' : '📤 上传视频'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 考试总结视频 */}
            <div className="video-item summary-video">
              <div className="video-header">
                <span className="video-icon">📝</span>
                <span className="video-title">{examData.videoFramework.summary.title}</span>
                <span className="video-duration">{examData.videoFramework.summary.duration}</span>
                <span 
                  className="upload-status"
                  style={{ color: getStatusColor(examData.videoFramework.summary.uploadStatus) }}
                >
                  {getStatusText(examData.videoFramework.summary.uploadStatus)}
                </span>
              </div>
              
              <div className="video-content-framework">
                <p className="content-description">{examData.videoFramework.summary.content}</p>
                
                {isAdmin && (
                  <div className="admin-actions">
                    <button 
                      className="btn-upload"
                      onClick={() => onVideoUpload(examData.examId, 'summary')}
                    >
                      {examData.videoFramework.summary.uploadStatus === 'uploaded' ? '🔄 更新视频' : '📤 上传视频'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="exam-footer">
            <div className="expected-duration">
              <strong>预计总时长：{examData.videoFramework.totalExpectedDuration}</strong>
            </div>
            
            {!isAdmin && examData.statistics.uploadedVideos > 0 && (
              <button 
                className="btn-primary watch-btn"
                onClick={() => onVideoPlay(examData)}
              >
                🎥 观看讲解视频
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ExamVideoCard



