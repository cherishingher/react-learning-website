import React, { useState } from 'react'
import './VideoUploadModal.css'

const VideoUploadModal = ({ examData, onUploadComplete, onClose }) => {
  const [uploadForm, setUploadForm] = useState({
    videoFile: null,
    title: '',
    description: '',
    duration: '',
    topics: '',
    difficulty: '',
    notes: ''
  })
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setUploadForm({
      ...uploadForm,
      videoFile: file
    })
  }

  const handleInputChange = (e) => {
    setUploadForm({
      ...uploadForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!uploadForm.videoFile) {
      alert('请选择要上传的视频文件')
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      // 模拟文件上传进度
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // 模拟上传处理时间
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      clearInterval(progressInterval)
      setUploadProgress(100)

      // 模拟成功回调
      setTimeout(() => {
        onUploadComplete({
          examId: examData.examId,
          videoType: examData.videoType,
          problemNumber: examData.problemNumber,
          uploadData: uploadForm,
          uploadTime: new Date()
        })
      }, 500)

    } catch (error) {
      alert('上传失败，请重试')
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const getVideoTypeDisplay = () => {
    if (examData.videoType === 'overview') return '📋 考试概览'
    if (examData.videoType === 'problem') return `🧮 第${examData.problemNumber}题讲解`
    if (examData.videoType === 'summary') return '📝 考试总结'
    return '未知类型'
  }

  return (
    <div className="video-upload-modal-overlay">
      <div className="video-upload-modal">
        <div className="modal-header">
          <h3>📤 上传考试讲解视频</h3>
          <button className="close-btn" onClick={onClose}>❌</button>
        </div>

        <div className="upload-context">
          <div className="context-info">
            <h4>{examData.examData.title}</h4>
            <p>{examData.examData.subtitle}</p>
            <div className="upload-type">
              <strong>上传类型：{getVideoTypeDisplay()}</strong>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-section file-section">
            <h5>📁 选择视频文件</h5>
            <div className="file-input-wrapper">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                required
                className="file-input"
                id="video-file"
              />
              <label htmlFor="video-file" className="file-input-label">
                {uploadForm.videoFile ? uploadForm.videoFile.name : '点击选择视频文件'}
              </label>
            </div>
            <p className="file-hint">支持格式：MP4, AVI, MOV | 最大文件大小：500MB</p>
          </div>

          <div className="form-section info-section">
            <h5>📝 视频信息</h5>
            
            <div className="form-group">
              <label>视频标题</label>
              <input
                type="text"
                name="title"
                value={uploadForm.title}
                onChange={handleInputChange}
                placeholder="请输入视频标题"
                required
              />
            </div>

            <div className="form-group">
              <label>视频描述</label>
              <textarea
                name="description"
                value={uploadForm.description}
                onChange={handleInputChange}
                placeholder="详细描述视频内容和要点"
                rows="3"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>视频时长</label>
                <input
                  type="text"
                  name="duration"
                  value={uploadForm.duration}
                  onChange={handleInputChange}
                  placeholder="例：15:30"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>难度级别</label>
                <select
                  name="difficulty"
                  value={uploadForm.difficulty}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">选择难度</option>
                  <option value="入门">入门</option>
                  <option value="基础">基础</option>
                  <option value="中等">中等</option>
                  <option value="较难">较难</option>
                  <option value="困难">困难</option>
                  <option value="竞赛级">竞赛级</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>涉及知识点</label>
              <input
                type="text"
                name="topics"
                value={uploadForm.topics}
                onChange={handleInputChange}
                placeholder="用逗号分隔多个知识点，例：循环结构,条件判断,数组操作"
                required
              />
            </div>

            <div className="form-group">
              <label>教学备注</label>
              <textarea
                name="notes"
                value={uploadForm.notes}
                onChange={handleInputChange}
                placeholder="重点提醒、常见错误、拓展内容等"
                rows="2"
              />
            </div>
          </div>

          {uploading && (
            <div className="upload-progress-section">
              <h5>📊 上传进度</h5>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="progress-text">{uploadProgress}% 已完成</p>
              {uploadProgress === 100 && (
                <p className="success-message">✅ 上传成功！正在处理视频...</p>
              )}
            </div>
          )}

          <div className="modal-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={onClose}
              disabled={uploading}
            >
              取消
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={uploading || !uploadForm.videoFile}
            >
              {uploading ? '上传中...' : '📤 开始上传'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VideoUploadModal



