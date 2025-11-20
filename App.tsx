import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
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
  
  // Flag to prevent circular updates
  const [isUpdatingFromGrid, setIsUpdatingFromGrid] = useState(false);

  // Update Grid when Markdown changes (DataSource input)
  useEffect(() => {
    if (!isUpdatingFromGrid) {
      setGrid(parseMarkdownTable(markdown));
    }
  }, [markdown]);

  // Update Markdown when Grid changes (TableEditor)
  const handleGridChange = (newGrid: GridData) => {
    setGrid(newGrid);
    setIsUpdatingFromGrid(true);
    setMarkdown(gridToMarkdown(newGrid));
    // Reset flag after render cycle
    setTimeout(() => setIsUpdatingFromGrid(false), 0);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col lg:flex-row max-w-[1600px] mx-auto">
      <Sidebar />
      
      <main className="flex-1 w-full min-w-0">
         <DataSource 
            value={markdown} 
            onChange={setMarkdown} 
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