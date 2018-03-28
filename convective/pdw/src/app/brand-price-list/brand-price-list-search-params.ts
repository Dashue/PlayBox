import {DisplayType, HasExport, HasPaging, HasSorting} from '../models';

export interface BrandPriceListSearchParams extends HasExport, HasPaging, HasSorting {
  brandId: string;
  brandKey: string;
  priceListId: string;
  effectiveDate: string;
  displayType: DisplayType;
}
