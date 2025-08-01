# 廁所救星 (Toilet Saver) 🚽

一個基於 Tailwind CSS + shadcn/ui 的現代化公廁搜尋應用程式，支援視覺化主題編輯。

## 📁 專案結構

```
toilet_saver/
├── 📂 frontend/                 # 前端程式碼
│   ├── index.html              # 主要 HTML 檔案
│   └── src/
│       ├── 📂 components/       # React 元件
│       │   ├── 📂 ui/          # shadcn/ui 基礎元件
│       │   │   ├── badge.js
│       │   │   ├── button.js
│       │   │   ├── card.js
│       │   │   ├── input.js
│       │   │   └── select.js
│       │   ├── FloatingLeaves.js
│       │   └── ToiletItem.js
│       ├── 📂 lib/             # 工具函數
│       │   └── utils.js
│       ├── 📂 scripts/         # JavaScript 檔案
│       │   └── script.js       # 主要應用邏輯
│       ├── 📂 styles/          # 樣式檔案
│       │   ├── globals.css     # Tailwind CSS 全域樣式
│       │   ├── styles.css      # 原版自訂樣式
│       │   └── alt-backgrounds.css
│       └── 📂 assets/          # 靜態資源 (圖片等)
├── 📂 backend/                 # 後端程式碼
│   └── server.py              # Python 伺服器
├── 📂 ssl/                    # SSL 憑證
│   ├── server.crt
│   └── server.key
├── 📂 config/                 # 配置檔案備份
│   ├── components.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── 📂 docs/                   # 專案文件
│   ├── README.md
│   └── setup-tweakcn.md
├── 📄 package.json            # 主要依賴設定
├── 📄 tailwind.config.js      # Tailwind 設定
├── 📄 vite.config.js          # Vite 建置設定
├── 📄 postcss.config.js       # PostCSS 設定
└── 📄 components.json         # shadcn/ui 設定
```

## 🚀 快速開始

### 方法一：使用 npm 指令
```bash
# 1. 安裝依賴
npm install

# 2. 啟動開發伺服器
npm run dev
```

### 方法二：使用 Make 指令 (推薦)
```bash
# 查看所有可用指令
make help

# 快速設定專案
make setup

# 啟動開發伺服器
make dev
```

### 方法三：使用自動化腳本
```bash
# 完整專案初始化
./scripts/setup-project.sh

# 啟動開發伺服器
./scripts/dev-server.sh
```

### 3. 開啟瀏覽器
訪問 http://localhost:3000 (或系統分配的其他埠號)

## 🎨 使用 Tweakcn 美化主題

### 安裝 Tweakcn
```bash
git clone https://github.com/jnsahaj/tweakcn.git tweakcn-editor
cd tweakcn-editor
npm install
npm run dev
```

### 使用步驟
1. 在 Tweakcn 中上傳 `tailwind.config.js`
2. 視覺化編輯主題顏色和元件樣式
3. 匯出自訂 CSS 變數
4. 應用到 `frontend/src/styles/globals.css`

## 📱 功能特色

- ✅ **響應式設計** - 支援手機和桌面裝置
- ✅ **玻璃擬態效果** - 現代化的透明背景設計
- ✅ **多語言支援** - 中文/英文切換
- ✅ **主題切換** - 多種背景主題選擇
- ✅ **地圖整合** - Leaflet 地圖顯示
- ✅ **篩選功能** - 無障礙、免費、營業中篩選
- ✅ **動畫效果** - 飄落樹葉、雲朵移動等動畫

## 🛠 技術架構

- **前端框架**: Vanilla JavaScript + HTML5
- **CSS 框架**: Tailwind CSS
- **UI 元件**: shadcn/ui
- **地圖服務**: Leaflet
- **建置工具**: Vite
- **後端服務**: Python Flask (可選)

## 📋 所有可用指令

### npm 指令
```bash
npm run dev          # 啟動前端開發伺服器
npm run build        # 建置專案
npm run backend      # 啟動後端伺服器
npm run start        # 啟動前端 (同 dev)
npm run preview      # 預覽建置結果
npm run setup        # 初始化專案
npm run clean        # 清理檔案
npm run full-dev     # 同時啟動前後端
npm run help         # 顯示指令說明
npm run tweakcn:setup # 安裝 Tweakcn
npm run tweakcn:dev   # 啟動 Tweakcn
```

### Make 指令 (推薦)
```bash
make help           # 顯示所有指令
make setup          # 完整專案初始化
make dev            # 啟動前端開發伺服器
make backend        # 啟動後端伺服器
make full-dev       # 同時啟動前後端
make build          # 建置專案
make serve          # 建置並預覽
make clean          # 清理檔案
make tweakcn-setup  # 安裝 Tweakcn
make tweakcn        # 啟動 Tweakcn
make status         # 檢查專案狀態
```

### 自動化腳本
```bash
./scripts/setup-project.sh  # 完整專案初始化
./scripts/dev-server.sh     # 智能啟動開發伺服器
./scripts/deploy.sh         # 專案部署腳本
```

## 📖 開發指南

### 添加新元件
1. 在 `frontend/src/components/` 建立新檔案
2. 使用 Tailwind CSS 類別進行樣式設計
3. 在需要的地方匯入使用

### 修改主題
1. 編輯 `tailwind.config.js` 中的顏色設定
2. 或使用 Tweakcn 視覺化編輯
3. 更新 `frontend/src/styles/globals.css` 中的 CSS 變數

### 部署應用
```bash
# 方法一：npm 指令
npm run build

# 方法二：Make 指令
make build

# 方法三：使用部署腳本
./scripts/deploy.sh
```
建置檔案會輸出到 `dist/` 目錄

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

## 📄 授權條款

MIT License