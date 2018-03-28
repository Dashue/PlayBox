import {GridPref} from '../shared/api/getGridPrefsResponse';

export interface ExportQueryParams {
  outputType?: string;
  outputPageSize?: string;
  configurationId: number;
  gridName: string;
}
