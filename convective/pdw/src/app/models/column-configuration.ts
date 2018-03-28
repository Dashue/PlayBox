export interface ColumnConfiguration {
  id: number;
  index: number;
  isReadOnly: boolean;
  allowSort: boolean
  isSorted: boolean;
  isSortedAscending: boolean;
  sortOrder: number;
  name: string;
  visible: boolean;
  width: number;
  align: string;
  header: string;
  hidden: boolean;
  dataType: string;
}
