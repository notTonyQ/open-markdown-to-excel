import React, { useState, useEffect } from 'react';
import { FileText, Upload, Play, Sparkles, RefreshCcw, ArrowLeft, Settings, Save } from 'lucide-react';
import { formatTextToMarkdown, AIConfig } from '../services/openaiService';

interface DataSourceProps {
  value: string;
  onChange: (value: string) => void;
  ignoreSeparatorLines: boolean;
  setIgnoreSeparatorLines: (value: boolean) => void;
}

const sampleMarkdown = `| Name | Age | Role |
|---|---|---|
| Alice | 28 | Engineer |
| Bob | 34 | Designer |
| Charlie | 22 | Intern |`;

const DataSource: React.FC<DataSourceProps> = ({ value, onChange, ignoreSeparatorLines, setIgnoreSeparatorLines }) => {
  const [isMagicMode, setIsMagicMode] = useState(false);
  const [magicPrompt, setMagicPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [aiConfig, setAiConfig] = useState<AIConfig>({
    endpoint: localStorage.getItem('openai_endpoint') || 'https://api.openai.com/v1/chat/completions',
    apiKey: localStorage.getItem('openai_apikey') || '',
    model: localStorage.getItem('openai_model') || 'gpt-3.5-turbo'
  });

  // Load config from localStorage on mount
  useEffect(() => {
    const savedEndpoint = localStorage.getItem('openai_endpoint');
    const savedApiKey = localStorage.getItem('openai_apikey');
    const savedModel = localStorage.getItem('openai_model');

    if (savedEndpoint || savedApiKey || savedModel) {
      setAiConfig(prev => ({
        endpoint: savedEndpoint || prev.endpoint,
        apiKey: savedApiKey || prev.apiKey,
        model: savedModel || prev.model
      }));
    }
  }, []);

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
      const formattedMarkdown = await formatTextToMarkdown(magicPrompt, aiConfig);
      if (formattedMarkdown) {
        onChange(formattedMarkdown);
        setIsMagicMode(false); // Switch back to editor to show result
        setMagicPrompt('');
      }
    } catch (error: any) {
      console.error("Failed to format", error);
      alert("Failed to format text. Please check your API configuration: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveConfig = () => {
    localStorage.setItem('openai_endpoint', aiConfig.endpoint);
    localStorage.setItem('openai_apikey', aiConfig.apiKey);
    localStorage.setItem('openai_model', aiConfig.model);
    alert('Configuration saved to localStorage');
  };


  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
            <FileText size={16} />
          </div>
          <span className="font-semibold text-slate-700">Data Source</span>
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
          <div className="w-full bg-slate-50 rounded-lg border border-slate-200 p-6">
             <div className="max-w-2xl mx-auto">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center justify-center gap-2">
                    <Sparkles className="text-purple-500" size={20}/>
                    AI Format Text to Markdown Table
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Paste unstructured or messy table data, and AI will format it into a proper Markdown table.
                  </p>
                </div>

                {/* Config Panel Toggle */}
                <div className="flex justify-center mb-4">
                  <button
                    onClick={() => setShowConfig(!showConfig)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
                  >
                    <Settings size={16} />
                    {showConfig ? 'Hide Configuration' : 'Configure AI'}
                  </button>
                </div>

                {/* Config Panel */}
                {showConfig && (
                  <div className="mb-6 p-4 bg-white rounded-lg border border-slate-200 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Endpoint</label>
                      <input
                        type="text"
                        value={aiConfig.endpoint}
                        onChange={(e) => setAiConfig(prev => ({...prev, endpoint: e.target.value}))}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="https://api.openai.com/v1/chat/completions"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">API Key</label>
                      <input
                        type="password"
                        value={aiConfig.apiKey}
                        onChange={(e) => setAiConfig(prev => ({...prev, apiKey: e.target.value}))}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="sk-..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                      <input
                        type="text"
                        value={aiConfig.model}
                        onChange={(e) => setAiConfig(prev => ({...prev, model: e.target.value}))}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="gpt-3.5-turbo"
                      />
                    </div>
                    <button
                      onClick={handleSaveConfig}
                      className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                    >
                      <Save size={16} /> Save to localStorage
                    </button>
                  </div>
                )}
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
          <>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="ignoreSeparatorLines"
                checked={ignoreSeparatorLines}
                onChange={(e) => setIgnoreSeparatorLines(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="ignoreSeparatorLines" className="text-sm text-slate-900">
                忽略分隔行（---）
              </label>
            </div>
            <textarea
              className="w-full h-64 bg-slate-800 text-slate-200 p-4 rounded-lg font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste your Markdown Table data or drag Markdown files here"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              spellCheck={false}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DataSource;