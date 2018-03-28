import {Injectable} from '@angular/core';
import {CustomerItemsSold, SoldItem} from '../models';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '../shared/api/api.service';

@Injectable()
export class CustomerItemsSoldService {

  constructor(private apiService: ApiService) {
  }

  public getCustomerItemsSold(customerId: string, effectiveDate: string,
                              page?: number, pageSize?: number): Observable<CustomerItemsSold> {
    let url = this.apiService.baseUrl;
    url += `/customerItemsSold&customerId=${customerId}`;
    url += `&effectiveDate=${effectiveDate}`;

    if (page) {
      url += `&page=${page}`;
    }
    if (pageSize) {
      url += `&pageSize=${pageSize}`;
    }

    return this.apiService.get(url).map((response: CustomerItemsSold) => response);
  }

  public getCustomerItemSold(itemNumber: number): Observable<SoldItem> {
    let url = this.apiService.baseUrl;
    url += `/customerItemsSold/${itemNumber}`;

    return this.apiService.get(url).map((response: SoldItem) => response);
  }
}
