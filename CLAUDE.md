# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Open Markdown Table to Excel Converter** - A React-based web application that converts Markdown tables to Excel format with an integrated spreadsheet editor and AI-powered table formatting using OpenAI API.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture & Key Components

### Technology Stack
- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS (CDN)
- **AI Integration**: OpenAI API (any OpenAI-compatible endpoint)
- **Icons**: Lucide React

### Core Architecture

The application follows a **3-step workflow** managed by the main App component:

1. **DataSource** (`components/DataSource.tsx`): Markdown input with file upload and AI generation
2. **TableEditor** (`components/TableEditor.tsx`): Spreadsheet-like grid editor
3. **TableGenerator** (`components/TableGenerator.tsx`): Export functionality with multiple format support

### Data Flow Pattern

```
Markdown → GridData → Export Formats
   ↑         ↓
   └─────────┘ (bidirectional sync)
```

- **Bidirectional Sync**: Changes in Markdown update the grid, and grid edits update the Markdown
- **State Management**: React hooks with circular update prevention using `isUpdatingFromGrid` flag
- **Type Safety**: Centralized types in `types.ts`

### Key Services & Utilities

**`services/openaiService.ts`**:
- Integrates with OpenAI-compatible APIs
- Formats unstructured text into proper Markdown table format
- Supports custom endpoints, API keys, and model selection
- User-configurable settings saved to localStorage

**`utils/converter.ts`**:
- `parseMarkdownTable()`: Converts Markdown tables to GridData format
- `gridToMarkdown()`: Converts GridData back to Markdown format
- `gridToCSV()`: CSV export with proper escaping
- `downloadFile()`: Generic file download utility

### AI Configuration

The AI formatting feature is user-configurable:
- Configure OpenAI-compatible endpoint, API key, and model in the UI
- Settings are automatically saved to browser's localStorage
- No server-side configuration required

### Export Formats Supported

- JSON (.json) - Fully implemented
- CSV (.csv) - Fully implemented with proper escaping
- Other formats (Excel, SQL, LaTeX, HTML, XML) - Planned for future releases

### Component Communication Pattern

Components communicate through props and callback functions:
- `DataSource` → `App` → `TableEditor` (Markdown changes)
- `TableEditor` → `App` → `DataSource` (Grid changes)
- `App` → `TableGenerator` (Export functionality)

This architecture ensures clean separation of concerns while maintaining synchronized state between the Markdown editor and grid view.