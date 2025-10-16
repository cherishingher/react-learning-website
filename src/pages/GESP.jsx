import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './GESP.css'

const GESP = () => {
  const navigate = useNavigate()
  const { user, isLoggedIn } = useUser()

  // 三种编程语言的GESP考级
  const programmingLanguages = {
    cpp: {
      id: 'cpp',
      name: 'C++编程',
      icon: '⚡',
      color: '#00599C',
      gradient: 'linear-gradient(135deg, #00599C, #004d82)',
      description: '面向算法竞赛和系统编程的专业语言',
      features: [
        '🏆 算法竞赛必备语言',
        '⚡ 高性能系统编程',
        '🎯 NOIP/IOI官方语言',
        '💪 培养严谨编程思维'
      ],
      difficulty: '⭐⭐⭐⭐⭐',
      ageRange: '10-16岁',
      applications: ['算法竞赛', '游戏开发', '系统编程', '嵌入式开发']
    },
    python: {
      id: 'python',
      name: 'Python编程',
      icon: '🐍',
      color: '#3776AB',
      gradient: 'linear-gradient(135deg, #3776AB, #2d5aa0)',
      description: '简洁易学的人工智能首选语言',
      features: [
        '🤖 人工智能首选语言',
        '📊 数据科学强大工具',
        '🎯 语法简洁易理解',
        '🌟 就业前景广阔'
      ],
      difficulty: '⭐⭐⭐',
      ageRange: '8-16岁',
      applications: ['人工智能', '数据分析', 'Web开发', '自动化脚本']
    },
    scratch: {
      id: 'scratch',
      name: 'Scratch编程',
      icon: '🎨',
      color: '#FF6B35',
      gradient: 'linear-gradient(135deg, #FF6B35, #f7931e)',
      description: '图形化编程，编程思维启蒙首选',
      features: [
        '🎨 图形化拖拽编程',
        '🧒 适合低龄儿童',
        '🎮 寓教于乐的学习',
        '💡 培养创意思维'
      ],
      difficulty: '⭐⭐',
      ageRange: '6-12岁',
      applications: ['编程启蒙', '创意动画', '互动故事', '简单游戏']
    }
  }

  const handleLanguageSelect = (languageId) => {
    navigate(`/gesp/${languageId}`)
  }

  return (
    <div className="gesp">
      <div className="gesp-hero">
        <div className="hero-content">
          <h1>GESP青少年软件编程等级考试</h1>
          <p>权威认证 • 分级进阶 • 能力证明</p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">种语言</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">个等级</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">权威</span>
              <span className="stat-label">官方认证</span>
            </div>
          </div>
        </div>
      </div>

      <div className="gesp-content">
        <div className="gesp-intro">
          <h2>🎯 什么是GESP考级？</h2>
          <p>
            GESP（Grade Examination of Software Programming）是由中国计算机学会主办的
            青少年软件编程等级考试，是国内最权威的青少年编程能力认证体系。
            考试分为1-8级，支持三种主流编程语言，为不同阶段的学习者提供科学的能力评估标准。
          </p>
          
          <div className="gesp-benefits">
            <div className="benefit-item">
              <div className="benefit-icon">🏆</div>
              <h3>权威认证</h3>
              <p>中国计算机学会官方认证，全国范围内广泛认可</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📈</div>
              <h3>能力进阶</h3>
              <p>8个级别科学递进，清晰规划学习路径</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🎓</div>
              <h3>升学助力</h3>
              <p>为升学和竞赛提供有力的能力证明</p>
            </div>
          </div>
        </div>

        <div className="language-selection">
          <h2>🌟 选择编程语言</h2>
          <p>每种语言都有完整的GESP八级体系，选择适合您的学习方向</p>
          
          <div className="languages-grid">
            {Object.values(programmingLanguages).map((language) => (
              <div 
                key={language.id}
                className="language-card"
                onClick={() => handleLanguageSelect(language.id)}
              >
                <div className="language-header" style={{ background: language.gradient }}>
                  <div className="language-icon">{language.icon}</div>
                  <h3 className="language-name">{language.name}</h3>
                  <div className="language-meta">
                    <span className="difficulty">{language.difficulty}</span>
                    <span className="age-range">{language.ageRange}</span>
                  </div>
                </div>
                
                <div className="language-content">
                  <p className="language-description">{language.description}</p>
                  
                  <div className="language-features">
                    <h4>🎯 特色优势</h4>
                    <ul>
                      {language.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="language-applications">
                    <h4>💼 应用领域</h4>
                    <div className="applications-tags">
                      {language.applications.map((app, index) => (
                        <span key={index} className="application-tag">{app}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="language-stats">
                    <div className="stat-item">
                      <span className="stat-number">8</span>
                      <span className="stat-label">个等级</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">66</span>
                      <span className="stat-label">个视频/级</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">528</span>
                      <span className="stat-label">总视频数</span>
                    </div>
                  </div>
                </div>
                
                <div className="language-footer">
                  <button className="language-btn" style={{ background: language.color }}>
                    🚀 进入{language.name}考级
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="gesp-advantages">
          <h2>🏆 GESP考级优势</h2>
          <div className="advantages-grid">
            <div className="advantage-item">
              <div className="advantage-icon">📜</div>
              <h3>权威认证</h3>
              <p>中国计算机学会官方认证，全国教育机构广泛认可</p>
            </div>
            <div className="advantage-item">
              <div className="advantage-icon">📈</div>
              <h3>科学分级</h3>
              <p>8个等级循序渐进，适配不同年龄和能力水平</p>
            </div>
            <div className="advantage-item">
              <div className="advantage-icon">🎯</div>
              <h3>能力证明</h3>
              <p>为升学、竞赛提供有力的编程能力证明</p>
            </div>
          </div>
        </div>

        <div className="gesp-roadmap">
          <h2>🗺️ 学习路径规划</h2>
          <div className="roadmap-container">
            <div className="roadmap-timeline">
              <div className="timeline-section beginner">
                <h3>🌱 启蒙阶段 (1-2级)</h3>
                <p>6-9岁 • 编程思维启蒙</p>
                <ul>
                  <li>• 编程概念认知</li>
                  <li>• 基础逻辑思维</li>
                  <li>• 图形化编程入门</li>
                </ul>
              </div>
              
              <div className="timeline-section intermediate">
                <h3>🧩 发展阶段 (3-4级)</h3>
                <p>8-12岁 • 算法思维培养</p>
                <ul>
                  <li>• 算法设计思想</li>
                  <li>• 数据结构概念</li>
                  <li>• 结构化编程</li>
                </ul>
              </div>
              
              <div className="timeline-section advanced">
                <h3>⚡ 进阶阶段 (5-6级)</h3>
                <p>10-14岁 • 竞赛能力建设</p>
                <ul>
                  <li>• 高级算法掌握</li>
                  <li>• 竞赛编程技巧</li>
                  <li>• CSP-J备考准备</li>
                </ul>
              </div>
              
              <div className="timeline-section expert">
                <h3>👑 精英阶段 (7-8级)</h3>
                <p>12-16岁 • 顶级竞赛水平</p>
                <ul>
                  <li>• 算法创新研究</li>
                  <li>• NOIP金牌冲刺</li>
                  <li>• 精英选手培养</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="enrollment-cta">
          <div className="cta-content">
            <h2>🎯 开始您的GESP学习之旅</h2>
            <p>选择适合的编程语言和级别，开启编程能力认证之路</p>
            <div className="cta-actions">
              <button 
                className="btn-primary cta-btn"
                onClick={() => navigate('/learning')}
              >
                🚀 立即开始学习
              </button>
              <button 
                className="btn-secondary cta-btn"
                onClick={() => navigate('/contact')}
              >
                📞 咨询课程顾问
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GESP