#!/bin/bash

# ==========================================
# 般若伴侣 (Prajna Companion) 自动部署脚本
# ==========================================

# 遇到错误立即退出
set -e

# ================= 配置区域 =================
# 请根据您的实际服务器环境修改以下变量
APP_DIR="/var/www/prajna-companion"  # 项目在服务器上的绝对路径
GIT_BRANCH="main"                    # 要拉取的 Git 分支
PM2_APP_NAME="prajna-companion"      # PM2 中的应用名称
# ==========================================

echo "🚀 开始部署 $PM2_APP_NAME..."

# 1. 进入项目目录
if [ ! -d "$APP_DIR" ]; then
  echo "❌ 错误: 项目目录 $APP_DIR 不存在！请先克隆仓库到该目录。"
  exit 1
fi

cd $APP_DIR

# 2. 拉取最新代码
echo "📦 正在从 Git 拉取最新代码 (分支: $GIT_BRANCH)..."
git fetch origin
git reset --hard origin/$GIT_BRANCH
git pull origin $GIT_BRANCH

# 3. 安装依赖
echo "🔧 正在安装 Node.js 依赖..."
npm install

# 4. 构建前端静态文件
echo "🏗️ 正在构建前端 (Vite build)..."
npm run build

# 5. 使用 PM2 启动或重启服务
echo "🔄 正在配置 PM2 服务..."

# 检查 PM2 是否已经运行了该应用
if pm2 show $PM2_APP_NAME > /dev/null 2>&1; then
    echo "应用已在运行，正在重载 (Reload)..."
    pm2 reload $PM2_APP_NAME
else
    echo "应用未运行，正在首次启动..."
    # 使用 npm start 启动，这会执行 package.json 中的 "start": "node server.ts"
    # 如果您的 Node.js 版本低于 22.6.0，不支持直接运行 ts 文件，
    # 请将下面的命令改为: pm2 start npx --name $PM2_APP_NAME -- tsx server.ts
    pm2 start npm --name $PM2_APP_NAME -- start
fi

# 6. 保存 PM2 进程列表（确保服务器重启后自动启动）
echo "💾 保存 PM2 进程列表..."
pm2 save

echo "✅ 部署完成！"
echo "👉 您可以使用 'pm2 logs $PM2_APP_NAME' 查看运行日志。"
