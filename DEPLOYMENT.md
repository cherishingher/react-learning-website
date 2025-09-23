# C++ 在线编译器部署指南

## 功能概述

本项目集成了一个完整的 C++ 在线编译器，支持：
- 真实的 C++ 代码编译和执行
- 标准输入输出支持
- STL 库支持
- 编译错误和运行时错误显示
- 超时控制和安全执行

## 技术栈

- **前端**: React + Vite + React Router
- **后端**: Node.js + Express
- **编译服务**: Piston API (免费)
- **样式**: CSS3 + 响应式设计

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

需要同时启动前端和后端：

```bash
# 终端 1: 启动后端服务器
node server/index.js

# 终端 2: 启动前端开发服务器
npm run dev
```

### 3. 访问应用

- 前端: http://localhost:3000
- C++ 编译器: http://localhost:3000/playground
- 后端 API: http://localhost:3001

## 生产部署

### 1. 构建前端

```bash
npm run build
```

### 2. 部署后端

后端服务器需要部署到支持 Node.js 的平台，如：
- Vercel
- Railway
- Heroku
- DigitalOcean

### 3. 环境变量

在生产环境中，确保设置以下环境变量：

```env
PORT=3001
NODE_ENV=production
```

### 4. 反向代理配置

使用 Nginx 或类似工具配置反向代理：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # 前端静态文件
    location / {
        root /path/to/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # API 代理
    location /api {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## API 文档

### POST /api/run

执行 C++ 代码

**请求体:**
```json
{
  "language": "cpp",
  "source": "#include <iostream>\nint main() { std::cout << \"Hello World!\"; return 0; }",
  "stdin": "input data"
}
```

**响应:**
```json
{
  "status": "Accepted",
  "stdout": "Hello World!",
  "stderr": "",
  "compile_output": "",
  "time": "0.001",
  "memory": "0"
}
```

## 安全考虑

1. **超时控制**: 代码执行限制在 10 秒内
2. **资源限制**: 内存使用限制
3. **沙箱执行**: 使用 Piston API 的沙箱环境
4. **输入验证**: 前后端都进行输入验证

## 故障排除

### 常见问题

1. **编译服务不可用**
   - 检查网络连接
   - 确认 Piston API 服务状态

2. **跨域问题**
   - 确保 Vite 代理配置正确
   - 检查后端 CORS 设置

3. **端口冲突**
   - 修改 vite.config.js 中的端口配置
   - 修改 server/index.js 中的端口配置

## 更新日志

### v1.0.0
- 集成 Piston API 实现真实 C++ 编译
- 添加 Playground 页面
- 实现完整的错误处理
- 添加超时控制和安全措施
