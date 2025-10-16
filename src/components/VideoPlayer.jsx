import React, { useState, useRef } from 'react'
import './VideoPlayer.css'

const VideoPlayer = ({ course, canWatch, onClose, onPurchase }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const videoRef = useRef(null)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    if (videoRef.current) {
      const clickX = e.nativeEvent.offsetX
      const width = e.target.offsetWidth
      const newTime = (clickX / width) * duration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="video-player-overlay">
      <div className="video-player-modal">
        <div className="video-player-header">
          <div className="video-info">
            <h3>{course.title}</h3>
            <span className="video-duration">⏱️ {course.duration}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            ❌
          </button>
        </div>

        <div className="video-container">
          {canWatch ? (
            <div className="video-wrapper">
              {/* 这里使用占位视频，实际项目中应该使用真实的视频URL */}
              <div className="demo-video-player">
                <div className="demo-video-screen">
                  <div className="demo-play-button" onClick={handlePlayPause}>
                    {isPlaying ? '⏸️' : '▶️'}
                  </div>
                  <div className="demo-video-title">{course.title}</div>
                </div>
                
                <div className="video-controls">
                  <button className="control-btn" onClick={handlePlayPause}>
                    {isPlaying ? '⏸️' : '▶️'}
                  </button>
                  
                  <div className="progress-container">
                    <div className="progress-bar" onClick={handleSeek}>
                      <div 
                        className="progress-fill" 
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                    <span className="time-display">
                      {formatTime(currentTime)} / {formatTime(duration || 0)}
                    </span>
                  </div>
                  
                  <div className="volume-container">
                    <span>🔊</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="volume-slider"
                    />
                  </div>
                </div>
              </div>

              {/* 隐藏的实际视频元素，用于时间控制 */}
              <video
                ref={videoRef}
                style={{ display: 'none' }}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              >
                {/* 实际项目中这里应该加载真实的视频文件 */}
              </video>
            </div>
          ) : (
            <div className="locked-video">
              <div className="lock-overlay">
                <div className="lock-icon">🔒</div>
                <h3>该课程需要解锁</h3>
                <p>{course.description}</p>
                
                {course.isFree ? (
                  <div className="login-prompt">
                    <p>请登录后观看免费课程</p>
                    <button className="btn-primary">立即登录</button>
                  </div>
                ) : (
                  <div className="purchase-prompt">
                    <div className="course-price-big">￥{course.price}</div>
                    <p>购买后可永久观看</p>
                    <button className="btn-warning" onClick={onPurchase}>
                      🛒 立即购买
                    </button>
                  </div>
                )}
                
                <div className="vip-promotion">
                  <div className="vip-banner">
                    <span>👑 VIP用户可免费观看所有付费课程</span>
                    <button className="btn-secondary vip-btn">了解VIP</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="video-description">
          <div className="course-meta">
            <div className="course-tags">
              {course.id.includes('scratch') && <span className="tag scratch">🎨 Scratch</span>}
              {course.id.includes('python') && <span className="tag python">🐍 Python</span>}
              {course.id.includes('cpp') && <span className="tag cpp">⚡ C++</span>}
              {course.isFree ? (
                <span className="tag free">🆓 免费</span>
              ) : (
                <span className="tag premium">💎 付费</span>
              )}
            </div>
          </div>
          
          <div className="course-full-description">
            <h4>课程介绍</h4>
            <p>{course.description}</p>
            
            <h4>你将学到</h4>
            <ul>
              <li>• 掌握核心编程概念和技能</li>
              <li>• 通过实际项目巩固知识</li>
              <li>• 培养问题解决和逻辑思维能力</li>
              <li>• 为进阶学习打下坚实基础</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer

