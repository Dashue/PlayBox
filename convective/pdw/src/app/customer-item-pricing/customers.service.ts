import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '../shared/api/api.service';
import {
  Customer, CustomerListResponse, HasExport, HasPaging, HasSorting, LookupFieldResponse, LookupFieldResult,
  RestrictSearch
} from '../models';
import {SearchQueryBuilderService} from '../shared/search-query-builder-service';

export interface CustomersSearchParams extends HasExport, HasPaging, HasSorting {
  restrictSearch?: RestrictSearch,
  bracketId?: string,
  city?: string,
  customerNumber?: string,
  customerName?: string,
  outletName?: string,
  outletNumber?: string,
  priceListId?: string,
  state?: string,
  zipCode?: string,
  fields?: string[],
}

@Injectable()
export class CustomersService {

  constructor(private apiService: ApiService) {
  }

  public searchByFieldKey(inputValue: string, recordsReturned: number = 7): Observable<LookupFieldResult[]> {
    let url = this.apiService.baseUrl;
    url += this.apiService.typeAheadDropDownUrl;
    url += `&dataTypeKey=WTASelectCustomer`;
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
    url += `&dataTypeKey=WTASelectCustomer`;
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

  public getCustomers(query: CustomersSearchParams): Observable<CustomerListResponse> {
    const url = this.buildDataUrl(query);
    return this.apiService.get(url).map((response: CustomerListResponse) => response);
  }

  public getCustomersReport(query: CustomersSearchParams): Observable<Blob> {
    const url = this.buildDataUrl(query);
    return this.apiService.getFile(url);
  }

  public getCustomer(customerId: number): Observable<Customer> {
    let url = this.apiService.baseUrl;
    url += `${this.apiService.customersUrl}/${customerId}`;

    return this.apiService.get(url).map((response: Customer) => response);
  }

  private buildDataUrl(query: CustomersSearchParams) {
    const params = {};

    if (query.restrictSearch !== null && query.restrictSearch !== undefined) {
      params['restrictSearch'] = query.restrictSearch;
    }
    if (query.bracketId) {
      params['bracketId'] = query.bracketId;
    }
    if (query.city) {
      params['city'] = query.city;
    }
    if (query.customerNumber) {
      params['customerNumber'] = query.customerNumber;
    }
    if (query.customerName) {
      params['name'] = query.customerName;
    }
    if (query.outletName) {
      params['outletName'] = query.outletName;
    }
    if (query.outletNumber) {
      params['outletNumber'] = query.outletNumber;
    }
    if (query.priceListId) {
      params['priceList'] = query.priceListId;
    }
    if (query.state) {
      params['state'] = query.state;
    }
    if (query.zipCode) {
      params['zipcode'] = query.zipCode;
    }
    if (query.fields) {
      params['fields'] = query.fields.join(',');
    }

    let url = this.apiService.customersUrl;
    url += `&`;
    url += SearchQueryBuilderService.build(params, query);

    return url;
  }
}
