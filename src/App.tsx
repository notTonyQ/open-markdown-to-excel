import React, { useState, useEffect } from 'react';
import DataSource from './components/DataSource';
import TableEditor from './components/TableEditor';
import TableGenerator from './components/TableGenerator';
import { GridData } from './types';
import { parseMarkdownTable, gridToMarkdown } from './utils/converter';

const initialMarkdown = `| Product | Price | Stock | Category |
|---|---|---|---|
| Laptop | $999 | 50 | Electronics |
| Chair | $199 | 200 | Furniture |
| Coffee | $15 | 500 | Grocery |`;

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [grid, setGrid] = useState<GridData>(parseMarkdownTable(initialMarkdown));
  const [ignoreSeparatorLines, setIgnoreSeparatorLines] = useState(true);

  // Flag to prevent circular updates
  const [isUpdatingFromGrid, setIsUpdatingFromGrid] = useState(false);

  // Update Grid when Markdown changes (DataSource input)
  useEffect(() => {
    if (!isUpdatingFromGrid) {
      setGrid(parseMarkdownTable(markdown, ignoreSeparatorLines));
    }
  }, [markdown, ignoreSeparatorLines]);

  // Update Markdown when Grid changes (TableEditor)
  const handleGridChange = (newGrid: GridData) => {
    setGrid(newGrid);
    setIsUpdatingFromGrid(true);
    setMarkdown(gridToMarkdown(newGrid));
    // Reset flag after render cycle
    setTimeout(() => setIsUpdatingFromGrid(false), 0);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-[1600px] mx-auto">
      <header className="mb-6 flex items-center gap-3">
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
        <h1 className="text-3xl font-bold text-slate-900">
          Open Markdown Table to Excel Converter
        </h1>
      </header>

      <main className="w-full">
         <DataSource
            value={markdown}
            onChange={setMarkdown}
            ignoreSeparatorLines={ignoreSeparatorLines}
            setIgnoreSeparatorLines={setIgnoreSeparatorLines}
         />

         <TableEditor
            grid={grid}
            setGrid={handleGridChange}
         />

         <TableGenerator
            grid={grid}
            setGrid={handleGridChange}
         />
      </main>
    </div>
  );
};

export default App;