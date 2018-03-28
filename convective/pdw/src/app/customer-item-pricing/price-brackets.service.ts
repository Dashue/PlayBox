import {Injectable} from '@angular/core';
import {ApiService} from '../shared/api/api.service';
import {LookupFieldResult} from '../models/lookup-field-result';
import {LookupFieldResponse} from '../models/lookup-field-response';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PriceBracketsService {

  constructor(private apiService: ApiService) {}

  getPriceBrackets(): Observable<LookupFieldResult[]> {
    let url = this.apiService.baseUrl;
    url += this.apiService.typeAheadDropDownUrl;
    url += `&dataTypeKey=WDDSelectPriceBrackets`;

    return this.apiService.get(url)
    .map((result: LookupFieldResponse) => {
      return result.data.map(x => new LookupFieldResult(x));
    });
  }
}
