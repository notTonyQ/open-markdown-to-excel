import React from 'react';
import { Database, Table, FileSpreadsheet } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="hidden lg:block w-64 flex-shrink-0 pr-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Table className="text-white w-5 h-5" />
          </div>
          TableConvert
        </h1>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Convert Markdown Table to Excel Online</h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          A free and powerful Markdown Table File to Excel online tool. Also available via API.
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 font-bold text-sm">
            1
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Data Source</h3>
            <p className="text-sm text-slate-500">Import Markdown Table for conversion to Excel. Supports file upload and online editing.</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 font-bold text-sm">
            2
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Online Table Editor</h3>
            <p className="text-sm text-slate-500">Process Markdown Table online using our table editor. Excel-like operation experience.</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 font-bold text-sm">
            3
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Table Generator</h3>
            <p className="text-sm text-slate-500">Quickly generate Excel with real-time preview. Rich export options, one-click copy & download.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;