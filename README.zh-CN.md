# Open Markdown Table to Excel 转换器

[English](README.md) | **简体中文**

一个功能强大的开源 Web 应用，可将 Markdown 表格转换为 Excel 格式，并集成了电子表格编辑器和 AI 智能表格格式化功能。

## ✨ 功能特点

### 🎯 核心功能
- **双向同步**：在 Markdown 视图或网格视图中编辑，实时同步
- **智能表格编辑器**：类 Excel 的网格编辑器，支持选择、复制/粘贴和单元格编辑
- **多格式支持**：导出为 JSON、CSV、Markdown 等多种格式
- **文件上传**：直接导入 Markdown 文件
- **表格操作**：转置、清空、转换大小写、去重等功能

### 🤖 AI 智能格式化
- **OpenAI 集成**：将混乱/非结构化的文本格式化为规范的 Markdown 表格
- **可自定义配置**：支持任何兼容 OpenAI 的端点（OpenAI、Azure OpenAI、本地模型等）
- **用户掌控**：配置您自己的 API 密钥和设置（存储在 localStorage 中）
- **智能提示**：AI 仅格式化现有内容，不生成新数据

### 🛠️ 内置工具
- **复制选择**：选择并复制特定表格范围
- **复制全部**：复制整个表格到剪贴板
- **格式转换**：在 Markdown、CSV 和 JSON 之间转换
- **表格清理**：删除空行、删除重复项、清空单元格
- **文本大小写转换**：大写、小写等
- **查找替换**：即将推出

## 🚀 快速开始

### 前置要求
- 推荐使用 Node.js 18+
- npm 或 yarn

### 安装步骤

1. 克隆仓库：
```bash
git clone <仓库地址>
cd open-markdown-to-excel
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

4. 在浏览器中打开：
```
http://localhost:3000/
```

### 生产环境构建

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

### 部署到 Cloudflare Pages（快速部署）

**一键部署（推荐）**

1. 在 GitHub 上 Fork 此仓库
2. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)
3. 进入 **Workers & Pages** → **创建应用** → **Pages** → **连接到 Git**
4. 选择您 Fork 的仓库
5. 在构建设置中：
   - **构建命令**：`npm run build`
   - **构建输出目录**：`dist`
6. 点击 **保存并部署**

您的网站将在 `https://your-project.pages.dev` 上线！

**手动部署（使用 Wrangler）**

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署到 Pages
wrangler pages deploy dist --project-name=open-markdown-to-excel
```

**配置说明**

已包含 `wrangler.jsonc` 配置文件：
```json
{
  "name": "open-markdown-to-excel",
  "compatibility_date": "2025-11-22",
  "assets": {
    "directory": "./dist"
  }
}
```

## 🎮 使用指南

### 基本工作流程

1. **输入 Markdown 表格**：在数据源部分粘贴您的 Markdown 表格
   - 或上传 Markdown 文件
   - 或使用示例按钮加载示例数据

2. **在网格中编辑**：使用在线表格编辑器修改数据
   - 点击单元格进行编辑
   - 用鼠标拖动选择范围
   - 使用工具栏按钮进行批量操作

3. **导出**：在表格生成器中选择格式并下载

### AI 智能功能

1. 点击  **"AI Magic"**  按钮（位于数据源部分）
2. 点击  **"Configure AI"**  并输入：
   - **端点**：您的 OpenAI 兼容 API 端点（默认：https://api.openai.com/v1/chat/completions）
   - **API 密钥**：您的 API 密钥（安全地存储在浏览器的 localStorage 中）
   - **模型**：模型名称（例如 gpt-3.5-turbo, gpt-4）
   - 点击 **"Save to localStorage"**
3. 在文本区域中粘贴混乱/非结构化文本
4. 点击 **"Format with AI"**，观看它转换为规范的 Markdown 表格
5. 格式化后的表格将显示在主编辑器中

### 使用自定义 AI 端点

本工具支持任何兼容 OpenAI 的 API 端点：

- **OpenAI**：`https://api.openai.com/v1/chat/completions`
- **Azure OpenAI**：`https://your-resource.openai.azure.com/openai/deployments/your-deployment/chat/completions`
- **本地模型**：LM Studio、Ollama、LocalAI 等
- **OpenRouter**：`https://openrouter.ai/api/v1/chat/completions`

## 🏗️ 技术栈

- **前端**：React 19.2.0 with TypeScript
- **构建工具**：Vite 6.2.0
- **样式**：Tailwind CSS（CDN）
- **图标**：Lucide React
- **AI 集成**：OpenAI 兼容 API（无需 SDK）
- **开发**：TypeScript ~5.8.2

## 📁 项目结构

```
src/
├── App.tsx                    # 主应用组件
├── components/
│   ├── DataSource.tsx        # Markdown 输入和 AI 格式化
│   ├── TableEditor.tsx       # 基于网格的表格编辑器
│   └── TableGenerator.tsx    # 导出功能
├── services/
│   └── openaiService.ts      # OpenAI API 集成
├── utils/
│   └── converter.ts          # 格式转换工具
├── types.ts                  # TypeScript 类型定义
└── ...
```

## 🔧 配置

### AI 设置（浏览器存储）

所有 AI 设置都存储在浏览器的 localStorage 中：
- `openai_endpoint`：API 端点 URL
- `openai_apikey`：API 密钥
- `openai_model`：模型名称

**重要**：API 密钥仅存储在您的浏览器本地，除了您配置的端点外，不会发送到任何服务器。

### Markdown 选项

- **忽略分隔行（---）**：切换是否在解析时忽略分隔行（|---|---|---|）

## 🌟 功能详解

### 表格编辑器功能
- **复制**：将选中的单元格复制到剪贴板（TSV 格式）
- **复制全部**：复制整个表格
- **转置**：交换行和列
- **清空**：清空所有单元格
- **删除空行**：删除无数据的行
- **去重**：删除重复行
- **大小写转换**：将文本转换为大写或小写

### 导出选项
- **JSON**：干净的 JSON 对象数组
- **CSV**：正确转义的 CSV 格式
- **更多格式**：即将推出

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

## 📄 许可证

本项目是开源的，采用 MIT 许可证。

## 💡 技巧

- **AI 提示**：AI 在处理清晰的表格类数据时效果最佳。您也可以添加注释来指导表格生成
- **安全性**：您的 API 密钥保留在浏览器中。我们不会存储或传输到其他地方

---

**Open Markdown Table to Excel Converter** - 让表格转换变得简单、快速、智能！🚀
