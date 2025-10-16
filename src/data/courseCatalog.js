export const COURSE_LIST = [
  // GESP考级课程
  {
    id: 1,
    title: 'GESP C++编程考级',
    category: 'GESP考级',
    type: 'certification',
    price: 'VIP免费',
    students: 2156,
    rating: 4.9,
    image: 'https://via.placeholder.com/300x200/00599C/white?text=GESP+C%2B%2B',
    description: 'C++编程GESP 1-8级完整考级体系，算法竞赛必备',
    features: ['🏆 权威认证', '📚 8个等级', '🎯 竞赛导向'],
    link: '/gesp/cpp',
    badge: '权威认证'
  },
  {
    id: 2,
    title: 'GESP Python编程考级',
    category: 'GESP考级',
    type: 'certification',
    price: 'VIP免费',
    students: 1897,
    rating: 4.8,
    image: 'https://via.placeholder.com/300x200/3776AB/white?text=GESP+Python',
    description: 'Python编程GESP 1-8级考级认证，人工智能入门首选',
    features: ['🤖 AI方向', '📊 数据科学', '🎯 简单易学'],
    link: '/gesp/python',
    badge: '权威认证'
  },
  {
    id: 3,
    title: 'GESP Scratch编程考级',
    category: 'GESP考级',
    type: 'certification',
    price: 'VIP免费',
    students: 3234,
    rating: 4.7,
    image: 'https://via.placeholder.com/300x200/FF6B35/white?text=GESP+Scratch',
    description: 'Scratch图形化编程GESP 1-8级，儿童编程启蒙首选',
    features: ['🎨 图形化', '🧒 适合儿童', '💡 创意思维'],
    link: '/gesp/scratch',
    badge: '权威认证'
  },

  // 在线学习课程
  {
    id: 4,
    title: 'Scratch创意编程',
    category: '编程启蒙',
    type: 'programming',
    price: 199,
    students: 1456,
    rating: 4.8,
    image: 'https://via.placeholder.com/300x200/FF6B35/white?text=Scratch创意编程',
    description: '图形化编程入门，培养逻辑思维和创意能力',
    features: ['🎮 游戏化学习', '🎨 创意项目', '🧩 逻辑思维'],
    link: '/learning',
    badge: '最受欢迎'
  },
  {
    id: 5,
    title: 'Python人工智能编程',
    category: '人工智能',
    type: 'programming',
    price: 299,
    students: 987,
    rating: 4.9,
    image: 'https://via.placeholder.com/300x200/3776AB/white?text=Python+AI',
    description: '学习Python基础到AI应用，掌握未来科技',
    features: ['🤖 AI应用', '📊 数据处理', '🚀 前沿技术'],
    link: '/learning',
    badge: '前沿技术'
  },
  {
    id: 6,
    title: 'C++算法竞赛专训',
    category: '算法竞赛',
    type: 'competition',
    price: 399,
    students: 756,
    rating: 4.9,
    image: 'https://via.placeholder.com/300x200/E74C3C/white?text=C%2B%2B竞赛',
    description: 'CSP-J、CSP-S、NOIP算法竞赛专业培训',
    features: ['🥉 CSP-J', '🥈 CSP-S', '🏆 NOIP'],
    link: '/gesp/cpp',
    badge: '竞赛专训'
  },

  // 乐高机器人课程
  {
    id: 7,
    title: 'LEGO机器人编程',
    category: '机器人编程',
    type: 'robotics',
    price: 359,
    students: 634,
    rating: 4.7,
    image: 'https://via.placeholder.com/300x200/FF9800/white?text=LEGO机器人',
    description: 'LEGO EV3/SPIKE编程，FLL、WRO竞赛培训',
    features: ['🤖 机器人搭建', '🏆 竞赛训练', '🧠 工程思维'],
    link: '/learning',
    badge: '实践课程'
  },
  {
    id: 8,
    title: 'VEX机器人竞赛',
    category: '机器人编程',
    type: 'robotics',
    price: 449,
    students: 423,
    rating: 4.8,
    image: 'https://via.placeholder.com/300x200/4CAF50/white?text=VEX机器人',
    description: 'VEX机器人设计与编程，国际机器人竞赛',
    features: ['🏗️ 机械设计', '💻 编程控制', '🌍 国际竞赛'],
    link: '/learning',
    badge: '国际竞赛'
  },

  // 在线学习课程
  {
    id: 9,
    title: '编程思维启蒙',
    category: '编程启蒙',
    type: 'foundation',
    price: 0,
    students: 2345,
    rating: 4.6,
    image: 'https://via.placeholder.com/300x200/2196F3/white?text=编程思维',
    description: '适合6-8岁儿童的编程思维培养课程',
    features: ['🧠 思维训练', '🎮 趣味学习', '👶 适合低龄'],
    link: '/learning',
    badge: '免费课程'
  },
  {
    id: 10,
    title: '信息学奥赛培训',
    category: '算法竞赛',
    type: 'competition',
    price: 599,
    students: 345,
    rating: 5,
    image: 'https://via.placeholder.com/300x200/9C27B0/white?text=信息学奥赛',
    description: 'NOIP、IOI等信息学奥林匹克竞赛专业培训',
    features: ['🏆 奥赛培训', '👑 金牌目标', '🎯 精英教育'],
    link: '/gesp/cpp',
    badge: '精英培训'
  }
]

export const COURSE_CATEGORIES = ['全部', 'GESP考级', '编程启蒙', '人工智能', '算法竞赛', '机器人编程']

export const CATEGORY_ICON_MAP = {
  全部: '📚',
  GESP考级: '🏆',
  编程启蒙: '🌱',
  人工智能: '🤖',
  算法竞赛: '🥇',
  机器人编程: '🤖'
}

