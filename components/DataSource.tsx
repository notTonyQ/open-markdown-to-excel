import React, { useState } from 'react';
import { FileText, Upload, Play, Sparkles, RefreshCcw, ArrowLeft } from 'lucide-react';
import { generateTableFromPrompt } from '../services/geminiService';
import { gridToMarkdown } from '../utils/converter';

interface DataSourceProps {
  value: string;
  onChange: (value: string) => void;
}

const sampleMarkdown = `| Name | Age | Role |
|---|---|---|
| Alice | 28 | Engineer |
| Bob | 34 | Designer |
| Charlie | 22 | Intern |`;

const DataSource: React.FC<DataSourceProps> = ({ value, onChange }) => {
  const [isMagicMode, setIsMagicMode] = useState(false);
  const [magicPrompt, setMagicPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const loadExample = () => {
    onChange(sampleMarkdown);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        onChange(text);
      }
    };
    reader.readAsText(file);
  };

  const handleMagicGenerate = async () => {
    if (!magicPrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const grid = await generateTableFromPrompt(magicPrompt);
      if (grid) {
        const markdown = gridToMarkdown(grid);
        onChange(markdown);
        setIsMagicMode(false); // Switch back to editor to show result
        setMagicPrompt('');
      }
    } catch (error) {
      console.error("Failed to generate", error);
      alert("Failed to generate table. Please check your API key or try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
            <FileText size={16} />
          </div>
          <span className="font-semibold text-slate-700">Data Source</span>
          <span className="text-blue-600 text-sm font-medium cursor-pointer flex items-center relative group">
             {isMagicMode ? 'AI Generator' : 'Markdown Table'}
          </span>
        </div>

        <div className="flex gap-2">
          {!isMagicMode ? (
            <>
               <button 
                onClick={() => setIsMagicMode(true)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-purple-600 border border-purple-200 bg-purple-50 rounded-full hover:bg-purple-100 transition"
              >
                <Sparkles size={14} /> AI Magic
              </button>
              <button 
                onClick={loadExample}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-full hover:bg-blue-50 transition"
              >
                <Play size={14} /> Example
              </button>
              <label className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-full hover:bg-slate-50 transition cursor-pointer">
                <Upload size={14} /> Upload File
                <input type="file" className="hidden" accept=".md,.txt" onChange={handleFileUpload} />
              </label>
            </>
          ) : (
            <button 
              onClick={() => setIsMagicMode(false)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-full hover:bg-slate-50 transition"
            >
              <ArrowLeft size={14} /> Back to Editor
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        {isMagicMode ? (
          <div className="w-full h-64 bg-slate-50 rounded-lg border border-slate-200 p-6 flex flex-col items-center justify-center">
             <div className="max-w-lg w-full space-y-4">
                <div className="text-center mb-2">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center justify-center gap-2">
                    <Sparkles className="text-purple-500" size={20}/> 
                    Generate Table with AI
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Describe the table you want (e.g., "Top 10 movies of 2023 with ratings") or paste unstructured data.
                  </p>
                </div>
                <textarea 
                  value={magicPrompt}
                  onChange={(e) => setMagicPrompt(e.target.value)}
                  className="w-full h-24 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm resize-none"
                  placeholder="Describe your table..."
                />
                <button
                  onClick={handleMagicGenerate}
                  disabled={isGenerating || !magicPrompt.trim()}
                  className="w-full py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCcw className="animate-spin" size={18} /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} /> Generate Content
                    </>
                  )}
                </button>
             </div>
          </div>
        ) : (
          <textarea
            className="w-full h-64 bg-slate-800 text-slate-200 p-4 rounded-lg font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste your Markdown Table data or drag Markdown files here"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
          />
        )}
      </div>
    </div>
  );
};

export default DataSource;