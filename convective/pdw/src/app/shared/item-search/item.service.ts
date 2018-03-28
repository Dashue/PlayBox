import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '../api/api.service';
import {
  HasExport, HasPaging, HasSorting, LookupFieldResponse, LookupFieldResult, RestrictSearch
} from '../../models';
import {SearchQueryBuilderService} from '../search-query-builder-service';

export interface ItemSearchParams extends HasExport, HasPaging, HasSorting {
  fields?: string;
  restrictSearch: RestrictSearch;
  productId?: string;
  itemDescription?: string;
  orderableItem?: string;
  pricingUnit?: string;
  status?: string;
}

export interface ItemListResponse {
  pageSize: number;
  page: number;
  total: number;
  data: ItemResponse[]
}

export interface ItemResponse {
  description: string;
  mrProductMasterId: number;
  status: string;
  pricingUnit: string;
  productId: string;
  orderableItem: string;
}

@Injectable()
export class ItemService {

  constructor(private apiService: ApiService) {
  }

  public searchByFieldKey(inputValue: string, recordsReturned: number = 7): Observable<LookupFieldResult[]> {
    let url = this.apiService.baseUrl;
    url += this.apiService.typeAheadDropDownUrl;
    url += `&dataTypeKey=WTASelectItem`;
    url += `&recordsReturned=${recordsReturned}`;

    if (inputValue) {
      url += `&inputField=fieldKey`;
      url += `&inputValue=${inputValue}`;
    }

    return this.apiService.get(url)
      .map((result: LookupFieldResponse) => {
        return result.data;
      });
  }

  public searchByDescription(description: string,
                             recordsReturned: number = 7): Observable<LookupFieldResult[]> {
    let url = this.apiService.baseUrl;
    url += this.apiService.typeAheadDropDownUrl;
    url += `&dataTypeKey=WTASelectItem`;
    url += `&recordsReturned=${recordsReturned}`;

    if (description) {
      url += `&inputField=fieldDescription`;
      url += `&inputValue=${description}`;
    }

    return this.apiService.get(url)
      .map((result: LookupFieldResponse) => {
        return result.data;
      });
  }

  public getItems(query: ItemSearchParams): Observable<ItemListResponse> {
    const url = this.buildItemsUrl(query);
    return this.apiService.get(url).map((result: ItemListResponse) => result);
  }

  public getItemsReport(query: ItemSearchParams): Observable<Blob> {
    const url = this.buildItemsUrl(query);
    return this.apiService.getFile(url);
  }

  public getItem(itemId: string): Observable<ItemResponse> {
    const url = `${this.apiService.itemsUrl}/${itemId}`;

    return this.apiService.get(url).map((result: ItemResponse) => result);
  }

  private buildItemsUrl(query: ItemSearchParams): string {
    const params = {};

    if (query.fields) {
      params['fields'] = query.fields;
    }

    params['restrictSearch'] = query.restrictSearch;

    if (query.productId) {
      params['productId'] = query.productId;
    }
    if (query.itemDescription) {
      params['itemDescription'] = query.itemDescription;
    }
    if (query.orderableItem) {
      params['orderableItem'] = query.orderableItem;
    }
    if (query.pricingUnit) {
      params['pricingUnit'] = query.pricingUnit;
    }
    if (query.status) {
      params['status'] = query.status;
    }

    let url = this.apiService.itemsUrl;
    url += '&';
    url += SearchQueryBuilderService.build(params, query);

    return url;
  }
}
