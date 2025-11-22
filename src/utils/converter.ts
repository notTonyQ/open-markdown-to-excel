import { GridData } from '../types';

export const parseMarkdownTable = (markdown: string, ignoreSeparatorLines: boolean = true): GridData => {
  const lines = markdown.trim().split('\n');
  const grid: GridData = [];

  for (const line of lines) {
    // Check for separator line with robust detection
    const isSeparator = (() => {
      const trimmed = line.trim();

      // Quick exclusion: if contains characters other than | - : space → not a separator
      if (/[^\s|\-:]/.test(trimmed)) return false;

      // Parse into cells
      const cells = trimmed.split('|')
        .map(c => c.trim())
        .filter(c => c.length > 0);

      // If no cells found → not a separator
      if (cells.length === 0) return false;

      // Validate each cell: must be only hyphens and optional colons at start/end
      const isValidCell = (cell: string) => {
        const cellTrimmed = cell.trim();
        // Match patterns: ---, :---, :---:, ---:
        return /^-+$/.test(cellTrimmed) ||
               /^:-+$/.test(cellTrimmed) ||
               /^:-+:$/.test(cellTrimmed) ||
               /^-+:$/.test(cellTrimmed);
      };

      return cells.every(isValidCell);
    })();

    if (isSeparator && ignoreSeparatorLines) {
      continue;
    }

    // Split by pipe, filter empty start/end if they exist due to leading/trailing pipes
    const row = line.split('|');

    // Clean up row
    let cleanRow = row.map(cell => cell.trim());

    // Remove first/last empty elements if the markdown had outer pipes
    if (line.trim().startsWith('|') && cleanRow.length > 0 && cleanRow[0] === '') {
      cleanRow.shift();
    }
    if (line.trim().endsWith('|') && cleanRow.length > 0 && cleanRow[cleanRow.length - 1] === '') {
      cleanRow.pop();
    }

    if (cleanRow.length > 0) {
      grid.push(cleanRow);
    }
  }

  // Normalize row lengths
  if (grid.length > 0) {
    const maxCols = Math.max(...grid.map(row => row.length));
    return grid.map(row => {
      while (row.length < maxCols) {
        row.push('');
      }
      return row;
    });
  }

  return [['']]; // Default empty
};

export const gridToMarkdown = (grid: GridData): string => {
  if (!grid || grid.length === 0) return '';

  const header = grid[0];
  const body = grid.slice(1);

  const headerRow = `| ${header.join(' | ')} |`;
  const separatorRow = `| ${header.map(() => '---').join(' | ')} |`;
  const bodyRows = body.map(row => `| ${row.join(' | ')} |`).join('\n');

  return `${headerRow}\n${separatorRow}\n${bodyRows}`;
};

export const gridToCSV = (grid: GridData): string => {
  return grid.map(row => 
    row.map(cell => {
      const cellStr = String(cell || '');
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      return cellStr;
    }).join(',')
  ).join('\n');
};

export const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};