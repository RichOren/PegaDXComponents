export interface Column<T> {
  width: string;
  header: string;
  accessor: keyof T;
  renderCell?: (value: T[keyof T]) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Array<Column<T>>;
  renderExpandPane?: (row: T) => React.ReactNode;
}

export interface RowProps<T> {
  row: T;
  columns: Array<Column<T>>;
  isExpanded: boolean;
  toggleExpand: () => void;
  renderExpandPane?: (row: T) => React.ReactNode;
}
