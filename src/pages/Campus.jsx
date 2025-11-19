import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Campus.css'

const Campus = () => {
  const { campusId } = useParams()
  const navigate = useNavigate()

  const campusData = {
    'yuexinlu': {
      id: 'yuexinlu',
      name: '金凤区阅欣路校区',
      fullName: '金致未来教育集团校区',
      address: '银川市金凤区阅欣路131号金致未来教育集团3楼卡巴',
      phone: '0951-3088176',
      hours: '周一至周日 9:00-21:00',
      transportation: [
        '公交：乘坐12路、23路到阅欣路站下车',
        '地铁：暂无地铁线路',
        '自驾：有专用停车场'
      ],
      features: [
        '💻 先进的教学设备',
        '🏢 宽敞明亮的教室环境', 
        '📚 丰富的学习资源',
        '🎯 专业的教学团队',
        '🌟 舒适的学习氛围'
      ],
      description: '位于金致未来教育集团内，拥有完善的教学设施和优秀的学习环境。校区配备了最新的教学设备，为学员提供最佳的学习体验。',
      image: 'https://via.placeholder.com/600x400?text=金凤区阅欣路校区'
    },
    'wanda': {
      id: 'wanda',
      name: '西夏区万达校区',
      fullName: '万达广场教学中心',
      address: '银川市西夏区金波北街75号万达广场(西夏店)二楼卡巴',
      phone: '0951-3088176',
      hours: '周一至周日 9:00-21:00',
      transportation: [
        '公交：乘坐1路、15路、32路到万达广场站',
        '地铁：暂无地铁线路',
        '自驾：万达广场地下停车场'
      ],
      features: [
        '🛍️ 位于繁华商业区',
        '🍽️ 周边餐饮配套完善',
        '🚗 交通便利易达',
        '🎪 学习娱乐两不误',
        '📍 地标性位置好找'
      ],
      description: '位于银川万达广场内，地理位置优越，交通便利。周边商业配套完善，学员可以在学习之余享受购物和餐饮的便利。',
      image: 'https://via.placeholder.com/600x400?text=西夏区万达校区'
    },
    'ccpark': {
      id: 'ccpark',
      name: '金凤区ccpark校区',
      fullName: 'CCPark创意园校区',
      address: '银川市金凤区北京中路192号ccpark二楼卡巴',
      phone: '0951-3088176',
      hours: '周一至周日 9:00-21:00',
      transportation: [
        '公交：乘坐6路、18路、29路到CCPark站',
        '地铁：暂无地铁线路',
        '自驾：园区内免费停车'
      ],
      features: [
        '🎨 创意园区氛围浓厚',
        '🌱 绿色生态环境',
        '☕ 园区内咖啡厅配套',
        '🎯 专注学习环境',
        '🚀 创新教学模式'
      ],
      description: 'CCPark创意园区内的现代化教学中心，环境优美，创意氛围浓厚。为追求高质量教学体验的学员提供理想的学习场所。',
      image: 'https://via.placeholder.com/600x400?text=金凤区CCPark校区'
    },
    'fenglinwan': {
      id: 'fenglinwan',
      name: '建发枫林湾校区',
      fullName: '建发枫林湾教学中心',
      address: '银川市金凤区建发枫林湾小镇50号楼二楼卡巴',
      phone: '0951-3088176',
      hours: '周一至周日 9:00-21:00',
      transportation: [
        '公交：乘坐25路、36路到枫林湾站',
        '地铁：暂无地铁线路',
        '自驾：小镇内停车位充足'
      ],
      features: [
        '🏘️ 安静的社区环境',
        '🌳 绿化环境优美',
        '👨‍👩‍👧‍👦 适合家庭学员',
        '🅿️ 停车方便',
        '🔇 学习环境安静'
      ],
      description: '位于建发枫林湾高档住宅区内，环境优美安静，特别适合需要专心学习的学员。周边绿化丰富，为学员提供舒适的学习氛围。',
      image: 'https://via.placeholder.com/600x400?text=建发枫林湾校区'
    }
  }

  const campus = campusData[campusId]

  if (!campus) {
    return (
      <div className="campus-not-found">
        <h1>校区未找到</h1>
        <p>抱歉，您访问的校区信息不存在。</p>
        <button className="btn-primary" onClick={() => navigate('/contact')}>
          返回联系我们
        </button>
      </div>
    )
  }

  const handleCallPhone = () => {
    window.open(`tel:${campus.phone}`)
  }

  const handleViewMap = () => {
    const mapUrl = `https://map.baidu.com/search/${encodeURIComponent(campus.address)}`
    window.open(mapUrl, '_blank')
  }

  return (
    <div className="campus">
      <div className="campus-hero">
        <div className="campus-hero-content">
          <h1>{campus.name}</h1>
          <p>{campus.fullName}</p>
          <div className="campus-quick-actions">
            <button className="btn-primary" onClick={handleCallPhone}>
              📞 立即致电
            </button>
            <button className="btn-secondary" onClick={handleViewMap}>
              🗺️ 查看地图
            </button>
          </div>
        </div>
      </div>

      <div className="campus-content">
        <div className="campus-grid">
          <div className="campus-main">
            <div className="campus-image">
              <img src={campus.image} alt={campus.name} />
            </div>
            
            <div className="campus-description">
              <h2>校区介绍</h2>
              <p>{campus.description}</p>
            </div>

            <div className="campus-features">
              <h2>校区特色</h2>
              <div className="features-grid">
                {campus.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="campus-transportation">
              <h2>交通路线</h2>
              <div className="transportation-list">
                {campus.transportation.map((route, index) => (
                  <div key={index} className="transportation-item">
                    {route}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="campus-sidebar">
            <div className="campus-info-card">
              <h3>基本信息</h3>
              <div className="info-item">
                <span className="info-label">📍 地址：</span>
                <span className="info-value">{campus.address}</span>
              </div>
              <div className="info-item">
                <span className="info-label">📞 电话：</span>
                <span className="info-value">{campus.phone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">⏰ 开放时间：</span>
                <span className="info-value">{campus.hours}</span>
              </div>
            </div>

            <div className="campus-contact-card">
              <h3>联系咨询</h3>
              <p>想了解更多关于{campus.name}的信息？</p>
              <button className="btn-primary full-width" onClick={handleCallPhone}>
                电话咨询
              </button>
              <button className="btn-secondary full-width" onClick={() => navigate('/contact')}>
                在线留言
              </button>
            </div>

            <div className="other-campuses">
              <h3>其他校区</h3>
              {Object.entries(campusData)
                .filter(([id]) => id !== campusId)
                .map(([id, data]) => (
                <div key={id} className="other-campus-item" onClick={() => navigate(`/campus/${id}`)}>
                  <strong>{data.name}</strong>
                  <small>{data.address.split('号')[0]}号</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Campus
