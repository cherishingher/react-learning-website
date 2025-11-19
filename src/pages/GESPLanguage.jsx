import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import GESPLevelSelector from '../components/GESPLevelSelector'
import FallingText from '../components/FallingText'
import './GESPLanguage.css'

const GESPLanguage = () => {
  const navigate = useNavigate()
  const { language } = useParams()
  const { user, isLoggedIn } = useUser()
  const [hoveredLevel, setHoveredLevel] = useState(null)

  // 编程语言配置
  const languageConfig = {
    cpp: {
      name: 'C++编程',
      icon: '⚡',
      color: '#00599C',
      gradient: 'linear-gradient(135deg, #00599C, #004d82)',
      description: 'C++是一种高效的编程语言，广泛应用于算法竞赛、游戏开发和系统编程',
      advantages: [
        '🏆 国际信息学奥赛(IOI)官方语言',
        '⚡ 执行效率高，性能优秀', 
        '🎯 算法竞赛首选语言',
        '💼 系统开发核心技术'
      ]
    },
    python: {
      name: 'Python编程', 
      icon: '🐍',
      color: '#3776AB',
      gradient: 'linear-gradient(135deg, #3776AB, #2d5aa0)',
      description: 'Python语法简洁明了，是人工智能和数据科学的首选语言',
      advantages: [
        '🤖 人工智能领域首选',
        '📊 数据科学强大工具',
        '🎯 语法简洁易上手',
        '🌟 就业前景极佳'
      ]
    },
    scratch: {
      name: 'Scratch编程',
      icon: '🎨', 
      color: '#FF6B35',
      gradient: 'linear-gradient(135deg, #FF6B35, #f7931e)',
      description: 'Scratch是图形化编程语言，最适合儿童编程思维启蒙',
      advantages: [
        '🎨 图形化拖拽编程',
        '🧒 专为儿童设计',
        '🎮 寓教于乐学习',
        '💡 培养创意思维'
      ]
    }
  }

  const highlightWordsMap = {
    cpp: ['高效', '算法', '竞赛', '系统'],
    python: ['人工智能', '数据', '首选', '语言'],
    scratch: ['图形化', '儿童', '创意', '思维']
  }

  const currentLanguage = languageConfig[language]

  if (!currentLanguage) {
    return (
      <div className="language-not-found">
        <h1>编程语言未找到</h1>
        <p>抱歉，您访问的编程语言不存在。</p>
        <button className="btn-primary" onClick={() => navigate('/gesp')}>
          返回GESP主页
        </button>
      </div>
    )
  }

  // GESP八个级别基础配置
  const gESPLevels = [
    {
      level: 1,
      name: 'GESP一级',
      subtitle: '编程启蒙',
      color: '#4CAF50',
      icon: '🌱',
      difficulty: '⭐',
      ageRange: '6-8岁',
      duration: '3-6个月',
      description: '编程思维启蒙，培养基础逻辑思维能力'
    },
    {
      level: 2,
      name: 'GESP二级', 
      subtitle: '逻辑进阶',
      color: '#2196F3',
      icon: '🧩',
      difficulty: '⭐⭐',
      ageRange: '7-9岁',
      duration: '4-8个月',
      description: '进一步发展逻辑思维，掌握基本编程概念'
    },
    {
      level: 3,
      name: 'GESP三级',
      subtitle: '算法思维',
      color: '#FF9800',
      icon: '🎯',
      difficulty: '⭐⭐⭐',
      ageRange: '8-11岁',
      duration: '6-10个月',
      description: '培养算法思维，掌握基础数据结构概念'
    },
    {
      level: 4,
      name: 'GESP四级',
      subtitle: '程序设计',
      color: '#9C27B0',
      icon: '💻',
      difficulty: '⭐⭐⭐⭐',
      ageRange: '9-12岁',
      duration: '8-12个月',
      description: '掌握程序设计基本功，培养结构化编程思维'
    },
    {
      level: 5,
      name: 'GESP五级',
      subtitle: '算法进阶',
      color: '#E91E63',
      icon: '⚡',
      difficulty: '⭐⭐⭐⭐⭐',
      ageRange: '10-13岁',
      duration: '10-15个月',
      description: '深入学习高级算法，培养竞赛编程能力'
    },
    {
      level: 6,
      name: 'GESP六级',
      subtitle: '竞赛基础',
      color: '#FF5722',
      icon: '🏅',
      difficulty: '⭐⭐⭐⭐⭐⭐',
      ageRange: '11-14岁',
      duration: '12-18个月',
      description: '达到初级竞赛水平，为CSP-J做准备'
    },
    {
      level: 7,
      name: 'GESP七级',
      subtitle: '竞赛进阶',
      color: '#673AB7',
      icon: '🚀',
      difficulty: '⭐⭐⭐⭐⭐⭐⭐',
      ageRange: '12-15岁',
      duration: '15-20个月',
      description: '达到中级竞赛水平，具备CSP-S参赛能力'
    },
    {
      level: 8,
      name: 'GESP八级',
      subtitle: '竞赛精英',
      color: '#F44336',
      icon: '👑',
      difficulty: '⭐⭐⭐⭐⭐⭐⭐⭐',
      ageRange: '13-16岁',
      duration: '18-24个月',
      description: '达到精英竞赛水平，具备NOIP金牌实力'
    }
  ]

  const handleLevelSelect = (level) => {
    navigate(`/gesp/${language}/level${level}`)
  }

  const handleBackToLanguages = () => {
    navigate('/gesp')
  }

  const highlightWords = highlightWordsMap[language] || ['编程', '学习']

  return (
    <div className="gesp-language">
      <div className="language-hero" style={{ background: currentLanguage.gradient }}>
        <div className="hero-content">
          <button className="back-btn" onClick={handleBackToLanguages}>
            ← 返回语言选择
          </button>
          
          <div className="language-title">
            <div className="language-icon-big">{currentLanguage.icon}</div>
            <h1>{currentLanguage.name} GESP考级</h1>
            <p className="language-tagline">逐级递进的GESP路线，为孩子打造系统化的编程成长曲线。</p>
            <FallingText
              text={currentLanguage.description}
              highlightWords={highlightWords}
              trigger="hover"
              backgroundColor="rgba(255, 255, 255, 0.15)"
              fontSize="1.5rem"
              gravity={0.42}
              className="language-hero-falling-text"
            />
          </div>

          <div className="language-highlights">
            <div className="highlight-stats">
              <div className="stat-item">
                <span className="stat-number">8</span>
                <span className="stat-label">个等级</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{currentLanguage.ageRange}</span>
                <span className="stat-label">适合年龄</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">528</span>
                <span className="stat-label">教学视频</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="language-content">
        <div className="language-advantages">
          <h2>✨ {currentLanguage.name}特色优势</h2>
          <div className="advantages-list">
            {currentLanguage.advantages.map((advantage, index) => (
              <div key={index} className="advantage-item">
                <span className="advantage-text">{advantage}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="levels-section">
          <h2>🎯 选择您的等级</h2>
          <p>根据您的编程基础和年龄，选择合适的起始等级</p>
          
          <div className="levels-grid">
            {gESPLevels.map((level) => (
              <GESPLevelSelector
                key={level.level}
                level={level}
                language={currentLanguage}
                onSelect={() => handleLevelSelect(level.level)}
                isHovered={hoveredLevel === level.level}
                onHover={() => setHoveredLevel(level.level)}
                onLeave={() => setHoveredLevel(null)}
                userLevel={user?.gESPLevel?.[language] || 0}
              />
            ))}
          </div>
        </div>

        <div className="learning-path">
          <h2>📈 {currentLanguage.name} 学习路径</h2>
          <div className="path-visualization">
            <div className="path-stages">
              <div className="stage beginner">
                <h3>🌱 启蒙阶段 (1-2级)</h3>
                <p>编程思维建立，基础概念理解</p>
                <div className="stage-levels">1级 → 2级</div>
              </div>
              
              <div className="stage intermediate">
                <h3>🧩 发展阶段 (3-4级)</h3>
                <p>算法思维培养，程序设计能力</p>
                <div className="stage-levels">3级 → 4级</div>
              </div>
              
              <div className="stage advanced">
                <h3>⚡ 进阶阶段 (5-6级)</h3>
                <p>高级算法掌握，竞赛基础建设</p>
                <div className="stage-levels">5级 → 6级</div>
              </div>
              
              <div className="stage expert">
                <h3>👑 精英阶段 (7-8级)</h3>
                <p>竞赛级别能力，顶尖选手培养</p>
                <div className="stage-levels">7级 → 8级</div>
              </div>
            </div>
          </div>
        </div>

        <div className="start-learning-cta">
          <div className="cta-content">
            <h2>🎯 开始您的{currentLanguage.name}学习之旅</h2>
            <p>选择合适的等级，开启编程能力认证之路</p>
            <div className="cta-actions">
              <button 
                className="btn-primary cta-btn"
                onClick={() => handleLevelSelect(1)}
              >
                🌱 从一级开始
              </button>
              <button 
                className="btn-secondary cta-btn"
                onClick={() => navigate('/contact')}
              >
                📞 咨询适合等级
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GESPLanguage








