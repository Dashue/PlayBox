import {HasExport, HasPaging, HasSorting} from '../models';

export interface ItemPriceListSearchParams extends HasExport, HasPaging, HasSorting {
  itemId: string;
  itemKey: string;
  priceListId: string;
  effectiveDate: string,
  displayType: string;
}
