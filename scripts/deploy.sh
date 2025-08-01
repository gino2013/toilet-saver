#!/bin/bash

# 廁所救星部署腳本
echo "🚽 廁所救星 - 部署腳本"
echo "========================"

# 檢查是否有未提交的變更
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  警告：有未提交的變更，請先提交後再部署"
    git status --short
    exit 1
fi

# 建置專案
echo "🏗️  建置專案..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 建置失敗！"
    exit 1
fi

echo "✅ 建置成功！"

# 檢查建置檔案
if [ ! -d "dist" ]; then
    echo "❌ 找不到建置檔案！"
    exit 1
fi

echo "📂 建置檔案："
ls -la dist/

echo "🚀 建置完成！檔案位於 dist/ 目錄"
echo "💡 您可以將 dist/ 目錄上傳到您的網頁伺服器"