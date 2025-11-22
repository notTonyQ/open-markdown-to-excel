import React, { useState, useEffect } from 'react';
import { GridData, ExportFormat } from '../types';
import { gridToCSV, downloadFile } from '../utils/converter';
import { FileDown, Copy, Table2 } from 'lucide-react';

interface TableGeneratorProps {
  grid: GridData;
  setGrid: (grid: GridData) => void;
}

const TableGenerator: React.FC<TableGeneratorProps> = ({ grid, setGrid }) => {
  const [activeTab, setActiveTab] = useState<ExportFormat>(ExportFormat.JSON);
  const [sheetName, setSheetName] = useState('Sheet 1');
  const [previewContent, setPreviewContent] = useState('');

  // Only show implemented formats: JSON, CSV (Excel hidden as it's actually CSV)
  const tabs = [ExportFormat.JSON, ExportFormat.CSV];

  useEffect(() => {
    // Update preview based on selection
    if (activeTab === ExportFormat.CSV) {
        setPreviewContent(gridToCSV(grid));
    } else if (activeTab === ExportFormat.JSON) {
        const headers = grid[0];
        const data = grid.slice(1).map(row => {
            const obj: Record<string, string> = {};
            headers.forEach((h, i) => { obj[h] = row[i] || ''; });
            return obj;
        });
        setPreviewContent(JSON.stringify(data, null, 2));
    } else {
        setPreviewContent("Preview not implemented for this format in demo.");
    }
  }, [grid, activeTab, sheetName]);

  const handleDownload = () => {
      if (activeTab === ExportFormat.CSV) {
          downloadFile(gridToCSV(grid), 'table.csv', 'text/csv');
      } else if (activeTab === ExportFormat.JSON) {
          downloadFile(previewContent, 'table.json', 'application/json');
      } else {
          // For Excel, we use CSV with .xls extension as a simple client-side hack that Excel opens warn-free usually
          // In a real app, use ExcelJS or SheetJS
          downloadFile(gridToCSV(grid), 'table.csv', 'text/csv'); 
      }
  };

  const handleCopy = () => {
      navigator.clipboard.writeText(previewContent);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center">
            <Table2 size={16} />
          </div>
          <h3 className="font-semibold text-slate-700">Table Generator</h3>
        </div>

        <div className="flex gap-2">
           <button onClick={handleCopy} className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-full hover:bg-blue-50 transition">
             <Copy size={14} /> Copy to Clipboard
           </button>
           <button onClick={handleDownload} className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-full hover:bg-blue-50 transition">
             <FileDown size={14} /> Download File
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto px-2 scrollbar-hide">
        {tabs.map(tab => (
            <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab 
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
            >
                {tab}
            </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex flex-col md:flex-row h-[500px]">
          {/* Left Settings Panel */}
          <div className="w-full md:w-1/3 lg:w-1/4 border-r border-slate-200 p-5 bg-white">
              {activeTab === ExportFormat.EXCEL && (
                  <div className="space-y-4">
                      <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                          Text Format
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                          Auto Width
                          <span className="text-slate-400 text-xs rounded-full border px-1">i</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                          Protect Sheet
                          <span className="text-slate-400 text-xs rounded-full border px-1">i</span>
                      </label>

                      <div className="pt-2">
                          <label className="block text-sm font-medium text-slate-600 mb-1">Sheet Name</label>
                          <input 
                            value={sheetName}
                            onChange={(e) => setSheetName(e.target.value)}
                            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                      </div>
                  </div>
              )}
              
              {activeTab !== ExportFormat.EXCEL && (
                  <div className="text-slate-500 text-sm italic">
                      Settings for {activeTab} are standard default.
                  </div>
              )}
          </div>

          {/* Right Preview Panel */}
          <div className="flex-1 bg-slate-50 p-4 overflow-auto">
              <pre className="font-mono text-xs text-slate-700 whitespace-pre-wrap break-all">
                  {previewContent}
              </pre>
          </div>
      </div>
    </div>
  );
};

export default TableGenerator;