#!/bin/bash

# 開發伺服器啟動腳本
echo "🚽 廁所救星 - 開發伺服器"
echo "========================"

# 檢查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安裝！請先安裝 Node.js"
    exit 1
fi

# 檢查依賴
if [ ! -d "node_modules" ]; then
    echo "📦 安裝依賴..."
    npm install
fi

# 檢查埠號是否被佔用
PORT=3000
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; do
    echo "⚠️  埠號 $PORT 被佔用，嘗試 $((PORT+1))"
    PORT=$((PORT+1))
done

echo "🚀 在埠號 $PORT 啟動開發伺服器..."
echo "🌐 訪問地址: http://localhost:$PORT"
echo "💡 按 Ctrl+C 停止伺服器"
echo ""

# 啟動開發伺服器
VITE_PORT=$PORT npm run dev