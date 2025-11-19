import React from 'react'
import './CertificateCarousel.css'

const CertificateCarousel = () => {
  // 编程方向成就证书
  const programmingCertificates = [
    { id: 1, title: 'Python编程竞赛一等奖', student: '李小明', year: '2024', type: 'python' },
    { id: 2, title: 'C++算法竞赛金奖', student: '王小红', year: '2024', type: 'cpp' },
    { id: 3, title: 'JavaScript创新项目奖', student: '张小强', year: '2024', type: 'javascript' },
    { id: 4, title: 'Java程序设计大赛冠军', student: '刘小华', year: '2023', type: 'java' },
    { id: 5, title: '算法设计与分析优秀奖', student: '陈小龙', year: '2024', type: 'algorithm' },
    { id: 6, title: 'AI人工智能项目创新奖', student: '黄小美', year: '2024', type: 'ai' },
    { id: 7, title: '编程马拉松最佳创意奖', student: '赵小刚', year: '2023', type: 'hackathon' },
    { id: 8, title: '数据结构竞赛一等奖', student: '孙小丽', year: '2024', type: 'datastructure' },
    { id: 9, title: 'Web全栈开发大赛金奖', student: '周小伟', year: '2024', type: 'fullstack' },
    { id: 10, title: '移动应用开发创新奖', student: '吴小敏', year: '2023', type: 'mobile' },
    { id: 11, title: '游戏开发设计竞赛冠军', student: '郑小宇', year: '2024', type: 'gamedev' },
    { id: 12, title: '网络安全挑战赛冠军', student: '马小峰', year: '2024', type: 'security' }
  ]

  // 乐高机器人方向成就证书
  const robotCertificates = [
    { id: 13, title: 'LEGO机器人搭建大赛冠军', student: '朱小雨', year: '2024', type: 'lego-build' },
    { id: 14, title: 'FLL机器人竞赛一等奖', student: '许小阳', year: '2023', type: 'fll' },
    { id: 15, title: 'WRO世界机器人奥赛金奖', student: '韩小雪', year: '2024', type: 'wro' },
    { id: 16, title: 'VEX机器人工程挑战赛冠军', student: '冯小晨', year: '2023', type: 'vex' },
    { id: 17, title: '机器人创意设计特等奖', student: '邓小夜', year: '2024', type: 'creative' },
    { id: 18, title: 'SPIKE Prime编程竞赛金奖', student: '姚小光', year: '2024', type: 'spike' },
    { id: 19, title: '机器人足球比赛冠军', student: '贺小月', year: '2023', type: 'soccer' },
    { id: 20, title: '智能机器人挑战赛优胜奖', student: '龙小星', year: '2024', type: 'smart' },
    { id: 21, title: 'Mindstorms EV3竞赛一等奖', student: '林小风', year: '2024', type: 'ev3' },
    { id: 22, title: '机器人救援任务挑战赛冠军', student: '陈小雪', year: '2023', type: 'rescue' },
    { id: 23, title: '自动化机器人设计大赛金奖', student: '李小光', year: '2024', type: 'automation' },
    { id: 24, title: '青少年机器人创新大赛特等奖', student: '王小亮', year: '2024', type: 'innovation' }
  ]

  // 为不同类型的证书生成不同颜色的占位图
  const getProgrammingPlaceholderImage = (cert) => {
    const colors = {
      python: '3776ab',
      cpp: '00599c',
      javascript: 'f7df1e', 
      java: 'ed8b00',
      algorithm: '667eea',
      ai: 'ff6b35',
      hackathon: '1abc9c',
      datastructure: '9b59b6',
      fullstack: '2ecc71',
      mobile: '3498db',
      gamedev: 'e74c3c',
      security: '34495e'
    }
    
    const color = colors[cert.type] || '667eea'
    return `https://via.placeholder.com/300x180/${color}/ffffff?text=${encodeURIComponent(cert.title)}`
  }

  const getRobotPlaceholderImage = (cert) => {
    const colors = {
      'lego-build': 'ff6900',
      fll: 'ff1744',
      wro: '2196f3',
      vex: '4caf50',
      creative: 'ff9800',
      spike: 'e91e63',
      soccer: '009688',
      smart: '795548',
      ev3: 'ffeb3b',
      rescue: 'f44336',
      automation: '9c27b0',
      innovation: '607d8b'
    }
    
    const color = colors[cert.type] || 'ff6900'
    return `https://via.placeholder.com/300x180/${color}/ffffff?text=${encodeURIComponent(cert.title)}`
  }

  // 渲染证书轮播行
  const renderCarouselRow = (certificates, getImageFunc, rowClass) => {
    const duplicatedCertificates = [...certificates, ...certificates]
    
    return (
      <div className={`carousel-row ${rowClass}`}>
        <div className="carousel-container">
          <div className="carousel-track">
            {duplicatedCertificates.map((cert, index) => (
              <div key={`${cert.id}-${index}`} className="certificate-card">
                <img 
                  src={getImageFunc(cert)} 
                  alt={cert.title}
                  className="certificate-image"
                />
                <div className="certificate-overlay">
                  <h4 className="certificate-title">{cert.title}</h4>
                  <p className="certificate-student">获奖学员：{cert.student}</p>
                  <p className="certificate-year">获奖年份：{cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-fade-left"></div>
        <div className="carousel-fade-right"></div>
      </div>
    )
  }

  return (
    <div className="certificate-carousel-dual">
      <div className="carousel-section">
        <h4 className="carousel-section-title">💻 编程竞赛成就</h4>
        {renderCarouselRow(programmingCertificates, getProgrammingPlaceholderImage, 'programming-row')}
      </div>
      
      <div className="carousel-section">
        <h4 className="carousel-section-title">🤖 乐高机器人成就</h4>
        {renderCarouselRow(robotCertificates, getRobotPlaceholderImage, 'robot-row')}
      </div>
    </div>
  )
}

export default CertificateCarousel
