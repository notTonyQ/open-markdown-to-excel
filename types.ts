export type GridData = string[][];

export enum ExportFormat {
  JSON = 'JSON',
  EXCEL = 'Excel',
  SQL = 'SQL',
  LATEX = 'LaTeX',
  HTML = 'HTML',
  CSV = 'CSV',
  MARKDOWN = 'Markdown',
  XML = 'XML'
}

export interface TableState {
  grid: GridData;
  rows: number;
  cols: number;
}

export interface MagicResponse {
  table_data: string[][];
}