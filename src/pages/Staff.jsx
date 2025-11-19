import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProfileCard from '../components/ProfileCard'
import './Staff.css'

const Staff = () => {
  const { staffId } = useParams()
  const navigate = useNavigate()

  const staffData = {
    'zhazezhelong': {
      id: 'zhazezhelong',
      name: '张泽龙',
      position: 'CEO',
      role: '公司创始人',
      campus: '总部',
      education: ['二十年教育投资经历'],
      title: '教育行业资深投资人',
      description: '拥有二十年丰富的教育行业投资经历，对教育市场有深刻洞察，致力于推动教育科技创新发展。',
      avatar: 'https://ui-avatars.com/api/?name=张泽龙&background=f97316&color=fff&size=400&font-size=0.45',
      handle: 'ZhaoZelong',
      status: '在线 · 战略投资',
      details: {
        experience: '20年',
        specialty: '教育投资、战略规划、市场分析',
        achievements: [
          '成功投资多个教育科技项目',
          '深度参与教育行业数字化转型',
          '建立完善的教育投资评估体系',
          '推动多个教育创新项目落地'
        ],
        philosophy: '教育是改变世界最有力的武器，投资教育就是投资未来',
        contact: {
          email: '20001204@gmail.com',
          phone: '0951-3088176'
        }
      }
    },
    'huoyinghao': {
      id: 'huoyinghao',
      name: '霍英豪',
      position: '首席技术官',
      role: '编程教学主管',
      campus: '技术中心',
      education: ['计算机硕士研究生', '数学与计算机双学士学位'],
      title: '计算机学会计算机视觉专委委员',
      description: '专业技术背景深厚，在计算机视觉和编程教学领域有丰富经验，负责技术体系建设和教学质量把控。',
      avatar: '/images/team/huoyinghao.jpg',
      handle: 'HuoTech',
      status: '在线 · 算法竞赛',
      details: {
        experience: '8年',
        specialty: '计算机视觉、人工智能、编程教育',
        achievements: [
          '计算机学会计算机视觉专委委员',
          '主导多个AI教育项目开发',
          '发表计算机视觉相关论文10余篇',
          '培养编程人才500+名'
        ],
        philosophy: '技术改变教育，教育成就未来',
        contact: {
          email: '20001204@gmail.com',
          phone: '0951-3088176'
        }
      }
    },
    'zhangjinlin': {
      id: 'zhangjinlin',
      name: '张金林',
      position: '教学总监',
      role: '教育规划专家',
      campus: '教学中心',
      education: ['南京航空航天大学'],
      title: '八年教育规划师',
      description: '南京航空航天大学毕业，拥有八年教育规划经验，专注于课程体系设计和教学质量提升。',
      avatar: 'https://ui-avatars.com/api/?name=张金林&background=a855f7&color=fff&size=400&font-size=0.45',
      handle: 'LynnZhang',
      status: '在线 · 教学管理',
      details: {
        experience: '8年',
        specialty: '教育规划、课程设计、教学管理',
        achievements: [
          '设计完善的STEM教育体系',
          '培训教师团队200+名',
          '开发精品课程50+门',
          '学员满意度达到98%以上'
        ],
        philosophy: '因材施教，让每个孩子都能找到属于自己的学习方式',
        contact: {
          email: '20001204@gmail.com',
          phone: '0951-3088176'
        }
      }
    }
  }

  const staff = staffData[staffId]

  if (!staff) {
    return (
      <div className="staff-not-found">
        <h1>员工信息未找到</h1>
        <p>抱歉，您访问的员工信息不存在。</p>
        <button className="btn-primary" onClick={() => navigate('/about')}>
          返回团队介绍
        </button>
      </div>
    )
  }

  const handleContactEmail = () => {
    window.open(`mailto:${staff.details.contact.email}`)
  }

  return (
    <div className="staff">
      <div className="staff-hero">
        <ProfileCard
          className="staff-profile-card"
          avatarUrl={staff.avatar}
          miniAvatarUrl={staff.avatar}
          name={staff.name}
          title={`${staff.position} · ${staff.role}`}
          handle={staff.handle || staff.id}
          status={staff.status || `${staff.details.experience} 经验`}
          contactText="联系我"
          enableTilt
          enableMobileTilt={false}
          showUserInfo
          onContactClick={handleContactEmail}
        />
        <div className="staff-hero-meta">
          <span className="meta-chip">📍 {staff.campus}</span>
          <span className="meta-chip">🕒 {staff.details.experience} 经验</span>
          <span className="meta-chip">🎯 专长：{staff.details.specialty}</span>
        </div>
      </div>

      <div className="staff-content">
        <div className="staff-grid">
          <div className="staff-main">
            <div className="staff-description">
              <h2>个人简介</h2>
              <p>{staff.description}</p>
            </div>

            <div className="staff-education">
              <h2>教育背景</h2>
              <div className="education-list">
                {staff.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    🎓 {edu}
                  </div>
                ))}
              </div>
            </div>

            <div className="staff-achievements">
              <h2>主要成就</h2>
              <div className="achievements-list">
                {staff.details.achievements.map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    ⭐ {achievement}
                  </div>
                ))}
              </div>
            </div>

            <div className="staff-philosophy">
              <h2>教育理念</h2>
              <blockquote>
                "{staff.details.philosophy}"
              </blockquote>
            </div>
          </div>

          <div className="staff-sidebar">
            <div className="staff-info-card">
              <h3>基本信息</h3>
              <div className="info-item">
                <span className="info-label">👤 姓名：</span>
                <span className="info-value">{staff.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">💼 职位：</span>
                <span className="info-value">{staff.position}</span>
              </div>
              <div className="info-item">
                <span className="info-label">📋 专业领域：</span>
                <span className="info-value">{staff.details.specialty}</span>
              </div>
              <div className="info-item">
                <span className="info-label">🏆 专业资质：</span>
                <span className="info-value">{staff.title}</span>
              </div>
            </div>

            <div className="staff-contact-card">
              <h3>联系方式</h3>
              <button className="contact-btn" onClick={handleContactEmail}>
                📧 邮件联系
              </button>
              <button className="contact-btn" onClick={() => navigate('/contact')}>
                💬 在线留言
              </button>
            </div>

            <div className="back-to-team">
              <button className="btn-secondary full-width" onClick={() => navigate('/about')}>
                ← 返回团队介绍
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Staff
