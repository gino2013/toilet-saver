#!/bin/bash

# 專案初始化腳本
echo "🚽 廁所救星 - 專案初始化"
echo "========================"

# 檢查必要工具
echo "🔍 檢查系統需求..."

# 檢查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安裝！"
    echo "請訪問 https://nodejs.org/ 下載並安裝 Node.js"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"

# 檢查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安裝！"
    exit 1
fi

echo "✅ npm 版本: $(npm --version)"

# 檢查 Python (可選)
if command -v python3 &> /dev/null; then
    echo "✅ Python 版本: $(python3 --version)"
elif command -v python &> /dev/null; then
    echo "✅ Python 版本: $(python --version)"
else
    echo "⚠️  Python 未安裝 (後端功能需要)"
fi

# 安裝依賴
echo ""
echo "📦 安裝專案依賴..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 依賴安裝失敗！"
    exit 1
fi

echo "✅ 依賴安裝完成！"

# 檢查專案結構
echo ""
echo "📂 檢查專案結構..."
if [ -f "frontend/index.html" ]; then
    echo "✅ 前端檔案存在"
else
    echo "❌ 前端檔案缺失"
fi

if [ -f "backend/server.py" ]; then
    echo "✅ 後端檔案存在"
else
    echo "❌ 後端檔案缺失"
fi

echo ""
echo "🎉 專案初始化完成！"
echo ""
echo "🚀 快速開始："
echo "  npm run dev        - 啟動前端開發伺服器"
echo "  npm run backend    - 啟動後端伺服器"
echo "  npm run help       - 查看所有可用指令"
echo "  make help          - 查看 Make 指令"
echo ""
echo "📖 更多資訊請查看 README.md"