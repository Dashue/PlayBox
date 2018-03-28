import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '../shared/api/api.service';
import {
  Brand, BrandsResponse, HasExport, HasPaging, HasSorting, LookupFieldResponse, LookupFieldResult, PriceList,
  RestrictSearch
} from '../models';
import {SearchQueryBuilderService} from '../shared/search-query-builder-service';
import {BrandPriceListSearchParams} from './brand-price-list-search-params';

export interface BrandSearchParams extends HasExport, HasPaging, HasSorting {
  fields?: string[];
  requestedBy?: string
  restrictSearch?: RestrictSearch,
  brandId?: string,
  brandDescription?: string
}

@Injectable()
export class BrandService {

  constructor(private apiService: ApiService) {
  }

  public searchByFieldKey(inputValue: string, recordsReturned: number = 7): Observable<LookupFieldResult[]> {

    let url = this.apiService.baseUrl;
    url += this.apiService.typeAheadDropDownUrl;
    url += `&dataTypeKey=WTASelectBrand`;
    url += `&recordsReturned=${recordsReturned}`;

    if (inputValue) {
      url += `&inputField=fieldKey`;
      url += `&inputValue=${inputValue}`;
    }

    return this.apiService.get(url)
      .map((result: LookupFieldResponse) => {
        return result.data.map(x => new LookupFieldResult(x));
      });
  }

  public searchByDescription(description: string,
                             recordsReturned: number = 7): Observable<LookupFieldResult[]> {
    let url = this.apiService.baseUrl;
    url += this.apiService.typeAheadDropDownUrl;
    url += `&dataTypeKey=WTASelectBrand`;
    url += `&recordsReturned=${recordsReturned}`;

    if (description) {
      url += `&inputField=fieldDescription`;
      url += `&inputValue=${description}`;
    }

    return this.apiService.get(url)
      .map((result: LookupFieldResponse) => {
        return result.data.map(x => new LookupFieldResult(x));
      });
  }

  public getBrands(query: BrandSearchParams): Observable<BrandsResponse> {
    const url = this.buildBrandsUrl(query);
    return this.apiService.get(url).map((response: BrandsResponse) => response);
  }

  public getBrandsReport(query: BrandSearchParams): Observable<Blob> {
    const url = this.buildBrandsUrl(query);
    return this.apiService.getFile(url);
  }

  public getBrand(brandId: string): Observable<Brand> {
    let url = this.apiService.baseUrl;
    url += `${this.apiService.brandsUrl}/${brandId}`;

    return this.apiService.get(url).map((response: Brand) => response);
  }

  public getBrandPriceList(query: BrandPriceListSearchParams): Observable<PriceList> {
    const url = this.buildBrandPriceListUrl(query);

    return this.apiService.get(url).map((response: PriceList) => response);
  }

  public getBrandPriceListReport(query: BrandPriceListSearchParams): Observable<Blob> {
    const url = this.buildBrandPriceListUrl(query);

    return this.apiService.getFile(url);
  }

  private buildBrandsUrl(query: BrandSearchParams) {
    const params = {};

    if (query.restrictSearch !== null && query.restrictSearch !== undefined) {
      params['restrictSearch'] = query.restrictSearch;
    }
    if (query.brandId) {
      params['brandId'] = query.brandId;
    }
    if (query.brandDescription) {
      params['brandDescription'] = query.brandDescription;
    }
    if (query.requestedBy) {
      params['requestedBy'] = query.requestedBy;
    }
    if (query.fields) {
      params['fields'] = query.fields.join(',');
    }

    let url = this.apiService.brandsUrl;
    url += '&';
    url += SearchQueryBuilderService.build(params, query);

    return url;
  }

  private buildBrandPriceListUrl(query: BrandPriceListSearchParams): string {
    const params = {};

    params['brandID'] = query.brandId;
    params['priceList'] = query.priceListId;
    params['effectiveDate'] = query.effectiveDate;
    params['displayType'] = query.displayType;

    let url = this.apiService.brandPriceListUrl;
    url += '&';
    url += SearchQueryBuilderService.build(params, query);

    return url;
  }
}
