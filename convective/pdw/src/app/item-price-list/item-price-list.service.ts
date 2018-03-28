import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '../shared/api/api.service';
import {LookupFieldResponse, LookupFieldResult, PriceList} from '../models';
import {ItemPriceListSearchParams} from './item-price-list-search-params';
import {SearchQueryBuilderService} from '../shared/search-query-builder-service';

@Injectable()
export class ItemPriceListService {
  priceListTypeAheadEndpoint = this.apiService.baseUrl + '/typeAheadDropDown&dataTypeKey=WDDSelectPriceList';

  constructor(private apiService: ApiService) {
  }

  public getData(): Observable<LookupFieldResult[]> {
    const url = this.priceListTypeAheadEndpoint;

    return this.apiService.get(url)
      .map((result: LookupFieldResponse) => {
        return result.data.map(x => new LookupFieldResult(x));
      })
      .catch(err => {
        console.error(err);
        return [];
      });
  }

  public getPriceList(query: ItemPriceListSearchParams): Observable<PriceList> {
    const url = this.buildItemsUrl(query);
    return this.apiService.get(url).map((result: PriceList) => result);
  }

  public getPriceListReport(query: ItemPriceListSearchParams): Observable<Blob> {
    const url = this.buildItemsUrl(query);
    return this.apiService.getFile(url);
  }

  private buildItemsUrl(query: ItemPriceListSearchParams): string {
    const date = query.effectiveDate;

    const params = {};
    params['item'] = query.itemId;
    params['priceList'] = query.priceListId;
    params['effectiveDate'] = date;
    params['displayType'] = query.displayType;

    let url = this.apiService.itemPriceListUrl;
    url += '&';
    url += SearchQueryBuilderService.build(params, query);

    return url;
  }
}
