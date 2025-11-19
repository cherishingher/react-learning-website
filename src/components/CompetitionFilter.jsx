import React, { useState } from 'react'
import './CompetitionFilter.css'

const CompetitionFilter = ({ courses, onFilterChange, selectedFramework }) => {
  const [activeFilter, setActiveFilter] = useState('all')

  // 提取所有C++竞赛框架
  const frameworks = {
    all: { name: '全部课程', icon: '📚', color: '#6c757d', count: 0 },
    GESP: { name: 'GESP考级', icon: '🎯', color: '#FF6B35', count: 0 },
    'CSP-J': { name: 'CSP入门组', icon: '🥉', color: '#4ECDC4', count: 0 },
    'CSP-S': { name: 'CSP提高组', icon: '🥈', color: '#E74C3C', count: 0 },
    NOIP: { name: 'NOIP奥赛', icon: '🏆', color: '#9B59B6', count: 0 }
  }

  // 统计每个框架的课程数量
  const cppCourses = courses.filter(course => course.id.startsWith('cpp-'))
  
  frameworks.all.count = cppCourses.length
  
  cppCourses.forEach(course => {
    if (course.framework && frameworks[course.framework]) {
      frameworks[course.framework].count++
    }
  })

  const handleFilterClick = (frameworkKey) => {
    setActiveFilter(frameworkKey)
    onFilterChange(frameworkKey)
  }

  return (
    <div className="competition-filter">
      <div className="filter-header">
        <h3>🏁 C++竞赛分类</h3>
        <p>选择您要备考的竞赛类型</p>
      </div>
      
      <div className="framework-tabs">
        {Object.entries(frameworks).map(([key, framework]) => (
          <button
            key={key}
            className={`framework-tab ${activeFilter === key ? 'active' : ''}`}
            onClick={() => handleFilterClick(key)}
            style={{
              '--framework-color': framework.color,
              borderColor: activeFilter === key ? framework.color : '#e0e0e0'
            }}
          >
            <div className="framework-icon">{framework.icon}</div>
            <div className="framework-info">
              <div className="framework-name">{framework.name}</div>
              <div className="framework-count">{framework.count} 门课程</div>
            </div>
          </button>
        ))}
      </div>

      <div className="framework-descriptions">
        {activeFilter === 'GESP' && (
          <div className="framework-desc gesp">
            <h4>🎯 GESP考级体系</h4>
            <p>全国青少年软件编程等级考试，共分6个等级，是国内权威的青少年编程能力认证体系。</p>
            <div className="framework-features">
              <span className="feature-tag">✅ 官方认证</span>
              <span className="feature-tag">✅ 分级考试</span>
              <span className="feature-tag">✅ 能力证明</span>
            </div>
          </div>
        )}
        
        {activeFilter === 'CSP-J' && (
          <div className="framework-desc csp-j">
            <h4>🥉 CSP-J入门组</h4>
            <p>CCF CSP-J (Junior) 面向初学者的程序设计竞赛，注重基础算法和编程能力培养。</p>
            <div className="framework-features">
              <span className="feature-tag">✅ CCF官方</span>
              <span className="feature-tag">✅ 基础算法</span>
              <span className="feature-tag">✅ 入门竞赛</span>
            </div>
          </div>
        )}
        
        {activeFilter === 'CSP-S' && (
          <div className="framework-desc csp-s">
            <h4>🥈 CSP-S提高组</h4>
            <p>CCF CSP-S (Senior) 高水平程序设计竞赛，要求掌握高级算法和数据结构。</p>
            <div className="framework-features">
              <span className="feature-tag">✅ 高级竞赛</span>
              <span className="feature-tag">✅ 复杂算法</span>
              <span className="feature-tag">✅ 名校敲门砖</span>
            </div>
          </div>
        )}
        
        {activeFilter === 'NOIP' && (
          <div className="framework-desc noip">
            <h4>🏆 NOIP信息学奥赛</h4>
            <p>全国青少年信息学奥林匹克联赛，国内最高水平的青少年程序设计竞赛。</p>
            <div className="framework-features">
              <span className="feature-tag">✅ 最高水平</span>
              <span className="feature-tag">✅ 奥赛资格</span>
              <span className="feature-tag">✅ 保送机会</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="learning-path">
        <h4>📈 建议学习路径</h4>
        <div className="path-flow">
          <div className="path-step">
            <span className="step-number">1</span>
            <span className="step-name">GESP考级</span>
            <span className="step-desc">打好基础</span>
          </div>
          <div className="path-arrow">→</div>
          <div className="path-step">
            <span className="step-number">2</span>
            <span className="step-name">CSP-J入门组</span>
            <span className="step-desc">竞赛入门</span>
          </div>
          <div className="path-arrow">→</div>
          <div className="path-step">
            <span className="step-number">3</span>
            <span className="step-name">CSP-S提高组</span>
            <span className="step-desc">算法进阶</span>
          </div>
          <div className="path-arrow">→</div>
          <div className="path-step">
            <span className="step-number">4</span>
            <span className="step-name">NOIP奥赛</span>
            <span className="step-desc">冲击金牌</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompetitionFilter








