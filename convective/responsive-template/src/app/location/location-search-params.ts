import {HasExport, HasPaging, HasSorting, RestrictSearch} from '../models';

export interface LocationSearchParams extends HasExport, HasPaging, HasSorting {
  fields?: string;
  restrictSearch?: RestrictSearch;

  effectiveDate: string;
  locationDesc?: string;
  locationKey: string;
  status: string;
}
