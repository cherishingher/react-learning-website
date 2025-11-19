import React from 'react'
import { useNavigate } from 'react-router-dom'
import FallingText from '../components/FallingText'
import ProfileCard from '../components/ProfileCard'
import './About.css'

const About = () => {
  const navigate = useNavigate()

  const teamMembers = [
    {
      id: 'zhazezhelong',
      name: '张泽龙',
      position: 'CEO',
      role: '公司创始人',
      campus: '总部',
      education: ['二十年教育投资经历'],
      title: '教育行业资深投资人',
      description: '拥有二十年丰富的教育行业投资经历，对教育市场有深刻洞察，致力于推动教育科技创新发展。',
      avatar: 'https://ui-avatars.com/api/?name=张泽龙&background=f97316&color=fff&size=200&font-size=0.48',
      subtitle: 'CEO · 战略投资人',
      handle: '@ZhaoZelong',
      accentColor: '#f97316',
      gradient: 'linear-gradient(145deg, #f97316, #0b1220)',
      profileUrl: '/staff/zhazezhelong'
    },
    {
      id: 'huoyinghao', 
      name: '霍英豪',
      position: '首席技术官',
      role: '编程教学主管',
      campus: '技术中心',
      education: ['计算机硕士研究生', '数学与计算机双学士学位'],
      title: '计算机学会计算机视觉专委委员',
      description: '专业技术背景深厚，在计算机视觉和编程教学领域有丰富经验，负责技术体系建设和教学质量把控。',
      avatar: '/images/team/huoyinghao.jpg',
      subtitle: 'CTO · 算法竞赛总监',
      handle: '@HuoTech',
      accentColor: '#38bdf8',
      gradient: 'linear-gradient(160deg, #38bdf8, #0b1220)',
      profileUrl: '/staff/huoyinghao'
    },
    {
      id: 'zhangjinlin',
      name: '张金林', 
      position: '教学总监',
      role: '教育规划专家',
      campus: '教学中心',
      education: ['南京航空航天大学'],
      title: '八年教育规划师',
      description: '南京航空航天大学毕业，拥有八年教育规划经验，专注于课程体系设计和教学质量提升。',
      avatar: 'https://ui-avatars.com/api/?name=张金林&background=a855f7&color=fff&size=200&font-size=0.48',
      subtitle: '教学总监 · 课程架构师',
      handle: '@LynnZhang',
      accentColor: '#a855f7',
      gradient: 'linear-gradient(200deg, #a855f7, #0b1220)',
      profileUrl: '/staff/zhangjinlin'
    }
  ]

  const handleViewProfile = (staffId) => {
    navigate(`/staff/${staffId}`)
  }
  return (
    <div className="about">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>关于我们</h1>
          <FallingText
            text="我们致力于用科技连接教育，让每一位学习者都能获得优质、个性化的成长体验。"
            highlightWords={['科技', '教育', '学习者', '优质', '成长']}
            trigger="load"
            backgroundColor="rgba(255, 255, 255, 0.06)"
            fontSize="1.8rem"
            gravity={0.4}
            className="about-hero-falling-text"
          />
        </div>
      </section>

      <section className="about-content">
        <div className="mission">
          <h2>我们的使命</h2>
          <p>
            我们相信教育应该是普惠的、高质量的，并且能够适应每个学习者的需求。
            通过先进的技术和精心设计的课程，我们致力于打造一个让人人都能获得
            优质教育资源的平台。
          </p>
        </div>

        <div className="values">
          <h2>核心价值观</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">🎯</div>
              <h3>专注品质</h3>
              <p>每一门课程都经过精心设计和反复打磨</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h3>用户至上</h3>
              <p>始终以学习者的需求为中心进行产品设计</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🚀</div>
              <h3>持续创新</h3>
              <p>不断探索新的教学方法和技术手段</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🌍</div>
              <h3>开放包容</h3>
              <p>为所有背景的学习者提供平等的学习机会</p>
            </div>
          </div>
        </div>

        <div className="team">
          <h2>我们的团队</h2>
          <p className="team-subtitle">
            一支深耕算法竞赛、课程研发与教学运营的专家团队，为学员提供全链路支持。
          </p>
          <div className="team-profile-grid">
            {teamMembers.map((member) => (
              <ProfileCard
                key={member.id}
                className="team-profile-card"
                avatarUrl={member.avatar}
                miniAvatarUrl={member.avatar}
                name={member.name}
                title={`${member.position} · ${member.role}`}
                handle={member.handle || member.id}
                status={member.subtitle || member.title}
                contactText="查看详情"
                enableTilt
                enableMobileTilt={false}
                showUserInfo
                onContactClick={() => handleViewProfile(member.id)}
              />
            ))}
          </div>
        </div>

        <div className="stats">
          <h2>我们的成就</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">注册学员</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">精品课程</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">学员满意度</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">在线支持</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
