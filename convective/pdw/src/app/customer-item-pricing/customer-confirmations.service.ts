import {Injectable} from '@angular/core';
import {ConfirmationItem} from '../models';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '../shared/api/api.service';

@Injectable()
export class CustomerConfirmationsService {

  constructor(private apiService: ApiService) {
  }

  public getConfirmationItemPricing(confirmationNumber: string,
                                    itemKey: string): Observable<ConfirmationItem> {
    const url = `${this.apiService.customerConfirmationsUrl}/${confirmationNumber}&item=${itemKey}`;
    return this.apiService.get(url).map((response: ConfirmationItem) => response);
  }
}
