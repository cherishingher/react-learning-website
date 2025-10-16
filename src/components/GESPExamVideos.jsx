import React, { useState } from 'react'
import ExamVideoCard from './ExamVideoCard'
import VideoUploadModal from './VideoUploadModal'
import './GESPExamVideos.css'

const GESPExamVideos = ({ level, language, isAdmin = false }) => {
  const [selectedExam, setSelectedExam] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedExamForUpload, setSelectedExamForUpload] = useState(null)

  // 生成GESP考试历史数据（第1次到第11次）
  const generateExamHistory = () => {
    const baseDate = new Date('2021-12-01') // 假设第一次考试时间
    const examHistory = []

    for (let i = 1; i <= 11; i++) {
      // 每三个月一次考试
      const examDate = new Date(baseDate)
      examDate.setMonth(baseDate.getMonth() + (i - 1) * 3)
      
      const seasons = ['春季', '夏季', '秋季', '冬季']
      const seasonIndex = Math.floor(((i - 1) % 4))
      const year = examDate.getFullYear()
      
      examHistory.push({
        examNumber: i,
        examId: `gesp-${language}-${level}-exam-${i.toString().padStart(2, '0')}`,
        title: `第${i}次GESP${level}级考试 (${language.toUpperCase()})`,
        subtitle: `${year}年${seasons[seasonIndex]}季考试`,
        examDate: examDate,
        season: seasons[seasonIndex],
        year: year,
        difficulty: level <= 2 ? '入门' : level <= 4 ? '基础' : level <= 6 ? '进阶' : '竞赛',
        videoFramework: {
          // 每套卷子的讲解视频框架
          overview: {
            title: '考试概览与分析',
            duration: '15-20分钟',
            content: '// 整体试卷分析、难度评估、解题策略',
            uploadStatus: 'pending', // pending, uploaded, processing
            videoUrl: null,
            uploadDate: null
          },
          problems: [
            {
              problemNumber: 1,
              title: `第${i}次考试 - 第1题详解`,
              difficulty: '基础',
              topics: ['// 具体知识点1', '// 具体知识点2'],
              duration: '8-12分钟',
              content: '// 题目分析、解题思路、代码实现、易错点提醒',
              uploadStatus: 'pending',
              videoUrl: null,
              uploadDate: null
            },
            {
              problemNumber: 2,
              title: `第${i}次考试 - 第2题详解`,
              difficulty: '中等',
              topics: ['// 具体知识点1', '// 具体知识点2'],
              duration: '12-18分钟',
              content: '// 题目分析、解题思路、代码实现、优化技巧',
              uploadStatus: 'pending',
              videoUrl: null,
              uploadDate: null
            },
            {
              problemNumber: 3,
              title: `第${i}次考试 - 第3题详解`,
              difficulty: level <= 2 ? '中等' : level <= 4 ? '较难' : '困难',
              topics: ['// 具体知识点1', '// 具体知识点2', '// 具体知识点3'],
              duration: '15-25分钟',
              content: '// 复杂题目分析、多种解法比较、算法优化',
              uploadStatus: 'pending',
              videoUrl: null,
              uploadDate: null
            },
            {
              problemNumber: 4,
              title: `第${i}次考试 - 第4题详解`,
              difficulty: level <= 2 ? '较难' : level <= 4 ? '困难' : '竞赛级',
              topics: ['// 高级知识点1', '// 高级知识点2', '// 综合应用'],
              duration: '20-30分钟',
              content: '// 高难度题目深度分析、竞赛技巧、拓展练习',
              uploadStatus: 'pending',
              videoUrl: null,
              uploadDate: null
            }
          ],
          summary: {
            title: '考试总结与备考建议',
            duration: '10-15分钟',
            content: '// 考试回顾、常见错误分析、下次备考建议',
            uploadStatus: 'pending',
            videoUrl: null,
            uploadDate: null
          },
          totalExpectedDuration: level <= 2 ? '60-80分钟' : level <= 4 ? '70-90分钟' : level <= 6 ? '80-110分钟' : '90-120分钟'
        },
        statistics: {
          totalVideos: 6, // 概览 + 4题 + 总结
          uploadedVideos: 0,
          totalDuration: 0,
          viewCount: 0,
          studentsHelped: 0
        }
      })
    }

    return examHistory
  }

  const examHistory = generateExamHistory()

  const handleVideoUpload = (examId, videoType, problemNumber = null) => {
    setSelectedExamForUpload({
      examId,
      videoType,
      problemNumber,
      examData: examHistory.find(exam => exam.examId === examId)
    })
    setShowUploadModal(true)
  }

  const handleUploadComplete = (uploadData) => {
    // 这里应该更新后端数据
    console.log('Video uploaded:', uploadData)
    setShowUploadModal(false)
    setSelectedExamForUpload(null)
    // 实际项目中应该刷新考试数据
  }

  const getUploadProgress = (exam) => {
    const totalVideos = exam.statistics.totalVideos
    const uploadedVideos = exam.statistics.uploadedVideos
    return Math.round((uploadedVideos / totalVideos) * 100)
  }

  const getExamStatus = (exam) => {
    const progress = getUploadProgress(exam)
    if (progress === 0) return 'not-started'
    if (progress === 100) return 'completed'
    return 'in-progress'
  }

  return (
    <div className="gesp-exam-videos">
      <div className="videos-header">
        <div className="header-info">
          <h3>📹 GESP{level}级 {language.toUpperCase()}考试讲解视频</h3>
          <p>历次考试真题详解，助您深入理解考点和解题技巧</p>
        </div>
        
        {isAdmin && (
          <div className="admin-actions">
            <button className="btn-primary admin-btn">
              📊 视频管理后台
            </button>
          </div>
        )}
      </div>

      <div className="exam-timeline">
        <h4>🗓️ 考试时间轴 (第1次 - 第11次)</h4>
        <div className="timeline-container">
          {examHistory.map((exam, index) => (
            <div key={exam.examId} className={`timeline-item ${getExamStatus(exam)}`}>
              <div className="timeline-marker">
                <span className="exam-number">{exam.examNumber}</span>
              </div>
              
              <div className="timeline-content">
                <div className="exam-basic-info">
                  <h5>{exam.title}</h5>
                  <p className="exam-subtitle">{exam.subtitle}</p>
                  <div className="exam-meta">
                    <span className="exam-date">
                      📅 {exam.examDate.toLocaleDateString()}
                    </span>
                    <span className="exam-difficulty">
                      📊 {exam.difficulty}
                    </span>
                  </div>
                </div>

                <div className="video-progress">
                  <div className="progress-info">
                    <span>视频进度: {exam.statistics.uploadedVideos}/{exam.statistics.totalVideos}</span>
                    <span className="progress-percent">{getUploadProgress(exam)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${getUploadProgress(exam)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="video-sections">
                  {/* 考试概览视频 */}
                  <div className="video-section overview">
                    <div className="section-header">
                      <span className="section-icon">📋</span>
                      <span className="section-title">考试概览</span>
                      <span className="section-duration">{exam.videoFramework.overview.duration}</span>
                    </div>
                    
                    {isAdmin ? (
                      <button 
                        className="upload-btn"
                        onClick={() => handleVideoUpload(exam.examId, 'overview')}
                      >
                        {exam.videoFramework.overview.uploadStatus === 'uploaded' ? '✅ 已上传' : '📤 上传视频'}
                      </button>
                    ) : (
                      <div className="content-placeholder">
                        <p>{exam.videoFramework.overview.content}</p>
                      </div>
                    )}
                  </div>

                  {/* 各题讲解视频 */}
                  <div className="problems-grid">
                    {exam.videoFramework.problems.map((problem, problemIndex) => (
                      <div key={problemIndex} className="video-section problem">
                        <div className="section-header">
                          <span className="section-icon">🧮</span>
                          <span className="section-title">第{problem.problemNumber}题</span>
                          <span className="difficulty-badge">{problem.difficulty}</span>
                        </div>
                        
                        <div className="problem-info">
                          <div className="problem-duration">{problem.duration}</div>
                          <div className="problem-topics">
                            {problem.topics.map((topic, topicIndex) => (
                              <span key={topicIndex} className="topic-tag">{topic}</span>
                            ))}
                          </div>
                        </div>

                        {isAdmin ? (
                          <button 
                            className="upload-btn"
                            onClick={() => handleVideoUpload(exam.examId, 'problem', problem.problemNumber)}
                          >
                            {problem.uploadStatus === 'uploaded' ? '✅ 已上传' : '📤 上传视频'}
                          </button>
                        ) : (
                          <div className="content-placeholder">
                            <p>{problem.content}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 考试总结视频 */}
                  <div className="video-section summary">
                    <div className="section-header">
                      <span className="section-icon">📝</span>
                      <span className="section-title">考试总结</span>
                      <span className="section-duration">{exam.videoFramework.summary.duration}</span>
                    </div>
                    
                    {isAdmin ? (
                      <button 
                        className="upload-btn"
                        onClick={() => handleVideoUpload(exam.examId, 'summary')}
                      >
                        {exam.videoFramework.summary.uploadStatus === 'uploaded' ? '✅ 已上传' : '📤 上传视频'}
                      </button>
                    ) : (
                      <div className="content-placeholder">
                        <p>{exam.videoFramework.summary.content}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="exam-stats">
                  <div className="stat-item">
                    <span className="stat-label">预计总时长</span>
                    <span className="stat-value">{exam.videoFramework.totalExpectedDuration}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">视频数量</span>
                    <span className="stat-value">{exam.statistics.totalVideos}个</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">学习人数</span>
                    <span className="stat-value">{exam.statistics.studentsHelped}人</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="upload-statistics">
        <h4>📊 上传统计</h4>
        <div className="upload-stats-grid">
          <div className="upload-stat-card">
            <div className="stat-number">{examHistory.length}</div>
            <div className="stat-label">考试场次</div>
          </div>
          <div className="upload-stat-card">
            <div className="stat-number">{examHistory.reduce((sum, exam) => sum + exam.statistics.totalVideos, 0)}</div>
            <div className="stat-label">视频总数</div>
          </div>
          <div className="upload-stat-card">
            <div className="stat-number">{examHistory.reduce((sum, exam) => sum + exam.statistics.uploadedVideos, 0)}</div>
            <div className="stat-label">已上传</div>
          </div>
          <div className="upload-stat-card">
            <div className="stat-number">
              {Math.round((examHistory.reduce((sum, exam) => sum + exam.statistics.uploadedVideos, 0) / 
               examHistory.reduce((sum, exam) => sum + exam.statistics.totalVideos, 0)) * 100) || 0}%
            </div>
            <div className="stat-label">完成度</div>
          </div>
        </div>
      </div>

      {showUploadModal && (
        <VideoUploadModal
          examData={selectedExamForUpload}
          onUploadComplete={handleUploadComplete}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  )
}

export default GESPExamVideos
