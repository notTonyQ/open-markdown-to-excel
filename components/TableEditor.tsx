import React, { useCallback } from 'react';
import { GridData } from '../types';
import { Undo, Redo, ArrowLeftRight, Trash2, Eraser, GripHorizontal, Type, FileType, CaseLower, CaseUpper } from 'lucide-react';

interface TableEditorProps {
  grid: GridData;
  setGrid: (grid: GridData) => void;
}

const TableEditor: React.FC<TableEditorProps> = ({ grid, setGrid }) => {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  // Helper to create letter headers (A, B, C...)
  const getColumnLabel = (index: number) => {
    let label = '';
    let i = index;
    while (i >= 0) {
      label = String.fromCharCode(65 + (i % 26)) + label;
      i = Math.floor(i / 26) - 1;
    }
    return label;
  };

  const updateCell = (r: number, c: number, value: string) => {
    const newGrid = [...grid];
    newGrid[r] = [...newGrid[r]];
    newGrid[r][c] = value;
    setGrid(newGrid);
  };

  const handleTranspose = () => {
    const newGrid = grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
    setGrid(newGrid);
  };

  const handleClear = () => {
    const newGrid = grid.map(row => row.map(() => ''));
    setGrid(newGrid);
  };

  const handleDeleteEmpty = () => {
    const newGrid = grid.filter(row => row.some(cell => cell.trim() !== ''));
    if (newGrid.length === 0) newGrid.push(Array(cols).fill(''));
    setGrid(newGrid);
  };

  const handleDedup = () => {
      const seen = new Set();
      const newGrid = grid.filter(row => {
          const key = row.join('|');
          if(seen.has(key)) return false;
          seen.add(key);
          return true;
      });
      setGrid(newGrid);
  }

  const handleUpperCase = () => {
    const newGrid = grid.map(row => row.map(cell => cell.toUpperCase()));
    setGrid(newGrid);
  };

  const handleLowerCase = () => {
    const newGrid = grid.map(row => row.map(cell => cell.toLowerCase()));
    setGrid(newGrid);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
            <FileType size={16} />
          </div>
          <h3 className="font-semibold text-slate-700">Online Table Editor</h3>
          <span className="text-sm text-blue-500 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
            {rows} × {cols}
          </span>
        </div>
        <div className="flex gap-2">
           {/* Window controls mockup */}
           <div className="text-blue-500 cursor-pointer">−</div>
           <div className="text-blue-500 cursor-pointer">⤢</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[500px]">
        {/* Toolbar */}
        <div className="w-full lg:w-64 border-r border-slate-200 p-4 flex flex-wrap lg:flex-col gap-3 overflow-y-auto bg-slate-50/50">
            
            <div className="grid grid-cols-3 gap-2 w-full">
                <button className="flex flex-col items-center justify-center p-2 bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 text-xs gap-1 h-16">
                    <Undo size={18} /> Undo
                </button>
                <button className="flex flex-col items-center justify-center p-2 bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 text-xs gap-1 h-16">
                    <Redo size={18} /> Redo
                </button>
                <button onClick={handleTranspose} className="flex flex-col items-center justify-center p-2 bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 text-xs gap-1 h-16">
                    <ArrowLeftRight size={18} className="rotate-90" /> Transpose
                </button>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full">
                <button onClick={handleClear} className="flex flex-col items-center justify-center p-2 bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 text-xs gap-1 h-16">
                    <Eraser size={18} /> Clear
                </button>
                <button onClick={handleDeleteEmpty} className="flex flex-col items-center justify-center p-2 bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 text-xs gap-1 h-16 text-center">
                    <Trash2 size={18} /> Del Empty
                </button>
                <button onClick={handleDedup} className="flex flex-col items-center justify-center p-2 bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 text-xs gap-1 h-16">
                    <GripHorizontal size={18} /> Dedup
                </button>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full">
                <button onClick={handleUpperCase} className="flex flex-col items-center justify-center p-2 bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 text-xs gap-1 h-16">
                    <CaseUpper size={18} /> UPPER
                </button>
                <button onClick={handleLowerCase} className="flex flex-col items-center justify-center p-2 bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 text-xs gap-1 h-16">
                    <CaseLower size={18} /> lower
                </button>
                <button className="flex flex-col items-center justify-center p-2 bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 text-xs gap-1 h-16">
                    <Type size={18} /> Capitalize
                </button>
            </div>

            <div className="w-full mt-2">
                <input 
                    placeholder="Find & Replace..." 
                    className="w-full border border-slate-200 rounded px-2 py-1.5 text-xs mb-2 focus:outline-none focus:border-blue-400"
                />
                 <button className="w-full py-1.5 border border-blue-200 rounded-full text-blue-500 text-xs font-medium hover:bg-blue-50">
                    Replace All
                </button>
            </div>
        </div>

        {/* Spreadsheet Grid */}
        <div className="flex-1 overflow-auto custom-scrollbar bg-slate-50 relative">
          <div className="inline-block min-w-full">
             {/* Header Row */}
             <div className="flex sticky top-0 z-10">
                <div className="w-10 h-8 bg-slate-100 border-r border-b border-slate-300 flex-shrink-0 sticky left-0 z-20"></div>
                {grid[0]?.map((_, colIndex) => (
                    <div key={colIndex} className="w-32 h-8 bg-slate-100 border-r border-b border-slate-300 flex items-center justify-center text-xs font-semibold text-slate-600 flex-shrink-0">
                        {getColumnLabel(colIndex)}
                    </div>
                ))}
             </div>

             {/* Data Rows */}
             {grid.map((row, rowIndex) => (
                 <div key={rowIndex} className="flex">
                     <div className="w-10 h-8 bg-slate-100 border-r border-b border-slate-300 flex items-center justify-center text-xs font-semibold text-slate-600 flex-shrink-0 sticky left-0 z-10">
                         {rowIndex + 1}
                     </div>
                     {row.map((cell, colIndex) => (
                         <input 
                            key={`${rowIndex}-${colIndex}`}
                            value={cell}
                            onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                            className="w-32 h-8 px-2 border-r border-b border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 bg-white truncate"
                         />
                     ))}
                 </div>
             ))}
          </div>
          <div className="absolute bottom-1 right-1 text-xs text-slate-400 italic p-1">
            data grid by DataGridXL
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableEditor;