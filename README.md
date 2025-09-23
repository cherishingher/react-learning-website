# 在线学习网站 📚

一个使用 React 构建的现代化在线学习平台。

## ✨ 功能特点

- 🎨 现代化的用户界面设计
- 📱 完全响应式布局
- 🧭 React Router 单页面应用导航
- 🎯 课程分类和筛选功能
- 👥 团队展示和联系方式
- 📝 在线留言表单
- ❓ 常见问题解答
- 💻 **C++ 在线编译器** - 支持真实代码编译和执行

## 🛠️ 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **路由**: React Router DOM
- **样式**: CSS3 + CSS Variables
- **开发语言**: JavaScript (JSX)
- **后端**: Node.js + Express
- **编译服务**: Piston API

## 📁 项目结构

```
learning-website/
├── public/
│   └── vite.svg
├── server/
│   ├── index.js          # 后端 API 服务器
│   └── .env              # 环境变量配置
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Courses.jsx
│   │   ├── Courses.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Contact.jsx
│   │   ├── Contact.css
│   │   ├── Playground.jsx    # C++ 编译器页面
│   │   └── Playground.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── DEPLOYMENT.md         # 部署指南
└── README.md
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

需要同时启动前端和后端：

```bash
# 终端 1: 启动后端服务器
node server/index.js

# 终端 2: 启动前端开发服务器
npm run dev
```

访问 http://localhost:3000 查看网站
访问 http://localhost:3000/playground 使用 C++ 编译器

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📱 页面介绍

### 首页 (Home)
- 英雄区域展示
- 特色功能介绍
- 热门课程推荐

### 课程 (Courses)  
- 课程分类筛选
- 课程卡片展示
- 评分和学员数量

### 关于我们 (About)
- 公司使命与价值观
- 团队成员介绍
- 数据统计展示

### 联系我们 (Contact)
- 多种联系方式
- 在线留言表单
- 常见问题解答

### C++ 编译器 (Playground)
- 在线代码编辑器
- 真实 C++ 编译和执行
- 标准输入输出支持
- 编译错误和运行时错误显示
- 支持 STL 库

## 🎨 设计特色

- **渐变背景**: 使用CSS渐变创建视觉吸引力
- **卡片设计**: 采用卡片式布局提升用户体验
- **悬停效果**: 丰富的交互动画和过渡效果
- **响应式**: 完美适配桌面、平板和手机设备

## 🔧 自定义配置

### 颜色主题
在 `src/index.css` 中修改 CSS 变量：

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  /* 更多颜色变量... */
}
```

### 添加新页面
1. 在 `src/pages/` 创建新的组件文件
2. 在 `src/App.jsx` 中添加路由配置
3. 在导航菜单中添加链接

## 📦 可用的脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产版本

## 🌟 后续开发建议

1. **用户认证系统** - 添加登录/注册功能
2. **课程详情页** - 实现课程详细信息页面
3. **购物车功能** - 添加课程购买流程
4. **用户个人中心** - 学习进度追踪
5. **搜索功能** - 课程搜索和高级筛选
6. **评论系统** - 课程评价和反馈
7. **响应式优化** - 进一步优化移动端体验

## 📄 开源协议

MIT License

---

👨‍💻 开发愉快！如有问题欢迎提交 Issue 或 Pull Request。
