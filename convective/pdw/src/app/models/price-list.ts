import {PriceListHeader} from './price-list-header';
import {PriceListColumn} from './price-list-column';

export interface PriceList {
  page: number;
  pageSize: number;
  total: number;
  headers: PriceListHeader[];
  data: PriceListColumn[][];
}
