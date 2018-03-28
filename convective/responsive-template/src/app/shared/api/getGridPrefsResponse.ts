type SortDirection = 'ASC' | 'DESC';

export interface ColumnPref {
  width: number;
  displayName: string;
  order: number;
  id: number;
  isSortable: boolean;
  visible: boolean;
  name: string;
  cellAlignment: string;
  dataType: string;
  hidden: boolean;
}

export interface GridPref {
  id: number;
  showSearch: boolean;
  pageSize: number;
  gridName: string;
  isDefault: boolean;
  isUserDefault: boolean;
  name: string;
  columns: ColumnPref[]
  searchConfig: QueryColumn[]
  sortConfig: {
    sortDirection: SortDirection;
    sortOrder: number;
    columnId: number;
  }[],
  temporaryConfiguration: boolean;
}

export interface GetGridPrefsResponse {
  gridName: string;
  configs: GridPref[];
  defaultPreferenceId: number;
  gridId: number;
}

export interface QueryColumn {
  columnName: string;
  value: string;
}
