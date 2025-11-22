# Open Markdown Table to Excel Converter

**English** | [简体中文](README.zh-CN.md)

A powerful, open-source web application that converts Markdown tables to Excel format with an integrated spreadsheet editor and AI-powered table formatting.

## ✨ Features

### 🎯 Core Functionality
- **Bidirectional Sync**: Edit in Markdown or Grid view with real-time synchronization
- **Smart Table Editor**: Excel-like grid editor with selection, copy/paste, and cell editing
- **Multiple Format Support**: Export to JSON, CSV, Markdown, and more
- **File Upload**: Import Markdown files directly
- **Table Manipulation**: Transpose, clear, convert case, remove duplicates, and more

### 🤖 AI-Powered Formatting
- **OpenAI Integration**: Format messy/unstructured text into proper Markdown tables
- **Customizable Configuration**: Use any OpenAI-compatible endpoint (OpenAI, Azure OpenAI, local models, etc.)
- **User-Controlled**: Configure your own API key and settings (stored in localStorage)
- **Smart Prompt**: AI only formats existing content, doesn't generate new data

### 🛠️ Built-in Tools
- **Copy Selection**: Select and copy specific table ranges
- **Copy All**: Copy entire table to clipboard
- **Format Conversion**: Convert between Markdown, CSV, and JSON
- **Table Cleaning**: Remove empty rows, remove duplicates, clear cells
- **Text Case Conversion**: Uppercase, lowercase, and more
- **Find & Replace**: Coming soon

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ recommended
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd open-markdown-to-excel
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser:
```
http://localhost:3000/
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to Cloudflare Pages (Quick Deploy)

**One-Click Deploy (Recommended)**

1. Fork this repository on GitHub
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
4. Select your forked repository
5. In build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Click **Save and Deploy**

Your site will be live at `https://your-project.pages.dev`!

**Manual Deploy (Using Wrangler)**

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy to Pages
wrangler pages deploy dist --project-name=open-markdown-to-excel
```

**Configuration**

A `wrangler.jsonc` is already included:
```json
{
  "name": "open-markdown-to-excel",
  "compatibility_date": "2025-11-22",
  "assets": {
    "directory": "./dist"
  }
}
```

## 🎮 How to Use

### Basic Workflow

1. **Input Markdown Table**: Paste your Markdown table in the Data Source section
   - Or upload a Markdown file
   - Or use the Example button to load sample data

2. **Edit in Grid**: Use the Online Table Editor to modify data
   - Click cells to edit
   - Select ranges with mouse drag
   - Use toolbar buttons for bulk operations

3. **Export**: Choose your format in the Table Generator and download

### AI Magic Feature

1. Click **"AI Magic"** button in Data Source section
2. Click **"Configure AI"** and enter:
   - **Endpoint**: Your OpenAI-compatible API endpoint (default: https://api.openai.com/v1/chat/completions)
   - **API Key**: Your API key (stored securely in browser's localStorage)
   - **Model**: Model name (e.g., gpt-3.5-turbo, gpt-4)
   - Click **"Save to localStorage"**
3. Paste messy/unstructured text in the textarea
4. Click **"Format with AI"** and watch as it's converted to a proper Markdown table
5. The formatted table appears in the main editor

### Using Custom AI Endpoints

This tool works with any OpenAI-compatible API endpoint:

- **OpenAI**: `https://api.openai.com/v1/chat/completions`
- **Azure OpenAI**: `https://your-resource.openai.azure.com/openai/deployments/your-deployment/chat/completions`
- **Local Models**: LM Studio, Ollama, LocalAI, etc.
- **OpenRouter**: `https://openrouter.ai/api/v1/chat/completions`

## 🏗️ Technology Stack

- **Frontend**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Lucide React
- **AI Integration**: OpenAI-compatible APIs (no SDK required)
- **Development**: TypeScript ~5.8.2

## 📁 Project Structure

```
src/
├── App.tsx                    # Main application component
├── components/
│   ├── DataSource.tsx        # Markdown input and AI formatting
│   ├── TableEditor.tsx       # Grid-based table editor
│   └── TableGenerator.tsx    # Export functionality
├── services/
│   └── openaiService.ts      # OpenAI API integration
├── utils/
│   └── converter.ts          # Format conversion utilities
├── types.ts                  # TypeScript type definitions
└── ...
```

## 🔧 Configuration

### AI Settings (Browser Storage)

All AI settings are stored in your browser's localStorage:
- `openai_endpoint`: API endpoint URL
- `openai_apikey`: API key
- `openai_model`: Model name

**Important**: API keys are stored locally in your browser and never sent to any server except your configured endpoint.

### Markdown Options

- **Ignore Separator Lines**: Toggle whether to ignore the separator line (`|---|---|---|`) when parsing

## 🌟 Key Features in Detail

### Table Editor Features
- **Copy**: Copy selected cells to clipboard (TSV format)
- **Copy All**: Copy entire table
- **Transpose**: Swap rows and columns
- **Clear**: Empty all cells
- **Delete Empty**: Remove rows without data
- **Deduplicate**: Remove duplicate rows
- **Case Conversion**: Convert text to uppercase or lowercase

### Export Options
- **JSON**: Clean JSON array of objects
- **CSV**: Properly escaped CSV format
- **More formats**: Coming in future releases

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips

- **AI Prompts**: The AI works best with clear table-like data. You may also add notes to guide table generation
- **Security**: Your API key stays in your browser. We don't store or transmit it anywhere else

---

**Open Markdown Table to Excel Converter** - Making table conversion simple, fast, and smart! 🚀
