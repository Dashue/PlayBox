import {SortConfiguration} from './sort-configuration';
import {SearchConfiguration} from './search-configuration';
import {ExportMetadata} from '../models';

export interface GridDataConfiguration {
  tableName: string;
  pageIndex: number;
  pageSize: number;
  currentSort: SortConfiguration[]
  search: SearchConfiguration[]
  exportConfig: ExportMetadata
}
