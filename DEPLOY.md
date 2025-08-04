# Netlify 部署指南

本项目是一个基于 Nuxt 3 的企业级聊天应用，已配置好 Netlify 部署环境。

## 部署步骤

### 1. 准备工作

确保你已经有：
- GitHub 账号
- Netlify 账号
- 项目代码已推送到 GitHub 仓库

### 2. 自动部署（推荐）

1. 登录 [Netlify](https://netlify.com)
2. 点击 "New site from Git"
3. 选择 GitHub 并授权
4. 选择你的项目仓库
5. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `.output/public`
   - **Node version**: `18`

6. 点击 "Deploy site"

### 3. 手动部署

如果你想手动部署：

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 部署
netlify deploy --prod --dir=.output/public
```

### 4. 环境变量配置

如果你的应用需要环境变量，在 Netlify 控制台中：

1. 进入你的站点设置
2. 点击 "Environment variables"
3. 添加所需的环境变量

### 5. 自定义域名（可选）

1. 在 Netlify 控制台中进入 "Domain settings"
2. 点击 "Add custom domain"
3. 按照指引配置 DNS

## 配置文件说明

### netlify.toml

项目根目录的 `netlify.toml` 文件包含了 Netlify 的构建和部署配置：

- 构建命令和输出目录
- 重定向规则（支持 SPA 路由）
- 安全头部配置
- Node.js 版本设置

### nuxt.config.ts

已添加 Netlify 特定配置：

- `nitro.preset: "netlify"` - 使用 Netlify 预设
- `ssr: true` - 启用服务端渲染
- `prerender.routes` - 预渲染路由配置

## 故障排除

### 构建失败

1. 检查 Node.js 版本是否为 18
2. 确保所有依赖都在 `package.json` 中
3. 检查构建日志中的错误信息

### 路由问题

如果页面刷新后出现 404 错误，确保 `netlify.toml` 中的重定向规则正确配置。

### 环境变量

确保所有必需的环境变量都在 Netlify 控制台中正确设置。

## 性能优化

- 启用了预渲染以提高首页加载速度
- 配置了安全头部
- 使用了 Netlify 的 CDN 加速

## 支持

如果遇到问题，可以：

1. 查看 Netlify 构建日志
2. 检查 [Nuxt 3 部署文档](https://nuxt.com/docs/getting-started/deployment#netlify)
3. 参考 [Netlify 文档](https://docs.netlify.com/)

---

部署完成后，你的应用将可以通过 Netlify 提供的 URL 访问，支持自动部署和回滚功能。