# 廁所救星專案 Makefile
.PHONY: help install dev build clean backend tweakcn

# 預設目標
help:
	@echo "🚽 廁所救星專案 - 可用指令："
	@echo ""
	@echo "📦 安裝與設定："
	@echo "  make install     - 安裝專案依賴"
	@echo "  make setup       - 完整專案初始化"
	@echo "  make clean       - 清理建置檔案"
	@echo ""
	@echo "🚀 開發："
	@echo "  make dev         - 啟動前端開發伺服器"
	@echo "  make backend     - 啟動後端伺服器"
	@echo "  make full-dev    - 同時啟動前後端"
	@echo ""
	@echo "🏗️  建置："
	@echo "  make build       - 建置專案"
	@echo "  make serve       - 建置並預覽"
	@echo ""
	@echo "🎨 Tweakcn："
	@echo "  make tweakcn-setup - 安裝 Tweakcn 編輯器"
	@echo "  make tweakcn      - 啟動 Tweakcn 編輯器"
	@echo ""
	@echo "📋 其他："
	@echo "  make status      - 檢查專案狀態"
	@echo "  make update      - 更新依賴套件"

# 安裝依賴
install:
	@echo "📦 安裝專案依賴..."
	npm install
	@echo "✅ 依賴安裝完成！"

# 專案初始化
setup: install
	@echo "🔧 專案初始化完成！"
	@echo "💡 使用 'make dev' 啟動開發伺服器"

# 啟動開發伺服器
dev:
	@echo "🚀 啟動前端開發伺服器..."
	npm run dev

# 啟動後端
backend:
	@echo "🐍 啟動後端伺服器..."
	npm run backend

# 同時啟動前後端
full-dev:
	@echo "🚀 同時啟動前後端..."
	npm run full-dev

# 建置專案
build:
	@echo "🏗️  建置專案..."
	npm run build
	@echo "✅ 建置完成！檔案位於 dist/ 目錄"

# 建置並預覽
serve: build
	@echo "👀 啟動預覽伺服器..."
	npm run preview

# 清理檔案
clean:
	@echo "🧹 清理建置檔案..."
	rm -rf dist/
	rm -rf node_modules/
	rm -f package-lock.json
	@echo "✅ 清理完成！"

# 重新安裝
fresh-install: clean install

# 安裝 Tweakcn
tweakcn-setup:
	@echo "🎨 安裝 Tweakcn 編輯器..."
	npm run tweakcn:setup
	@echo "✅ Tweakcn 安裝完成！"

# 啟動 Tweakcn
tweakcn:
	@echo "🎨 啟動 Tweakcn 編輯器..."
	npm run tweakcn:dev

# 檢查專案狀態
status:
	@echo "📊 專案狀態："
	@echo "Node.js 版本: $$(node --version)"
	@echo "npm 版本: $$(npm --version)"
	@echo "專案版本: $$(npm run --silent check | head -n 1 || echo '未知')"
	@ls -la frontend/index.html > /dev/null 2>&1 && echo "✅ 前端檔案存在" || echo "❌ 前端檔案缺失"
	@ls -la backend/server.py > /dev/null 2>&1 && echo "✅ 後端檔案存在" || echo "❌ 後端檔案缺失"

# 更新依賴
update:
	@echo "📦 更新依賴套件..."
	npm update
	@echo "✅ 依賴更新完成！"

# 快速啟動（最常用）
start: dev

# 完整重置
reset: clean setup
	@echo "🔄 專案重置完成！"