import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '../shared/api/api.service';
import {
  HasExport, HasPaging, HasSorting, RestrictSearch, ShipLocation, ShipLocationResponse
} from '../models';
import {LookupFieldResult} from '../models/lookup-field-result';
import {LookupFieldResponse} from '../models/lookup-field-response';
import {SearchQueryBuilderService} from '../shared/search-query-builder-service';

export interface ShipLocationSearchParams extends HasExport, HasPaging, HasSorting {
  restrictSearch?: RestrictSearch;
  plantName?: string;
  plantNumber?: string;
  fields?: string[];
}

@Injectable()
export class ShipLocationsService {

  constructor(private apiService: ApiService) {
  }

  public searchByFieldKey(inputValue: string, recordsReturned: number = 7): Observable<LookupFieldResult[]> {

    let url = this.apiService.baseUrl;
    url += this.apiService.typeAheadDropDownUrl;
    url += `&dataTypeKey=WTASelectShipLoc`;
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
    url += `&dataTypeKey=WTASelectShipLoc`;
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

  public getShipLocations(query: ShipLocationSearchParams): Observable<ShipLocationResponse> {
    const url = this.buildDataUrl(query);
    return this.apiService.get(url).map((response: ShipLocationResponse) => response);
  }

  public getShipLocationsReport(query: ShipLocationSearchParams): Observable<Blob> {
    const url = this.buildDataUrl(query);
    return this.apiService.getFile(url);
  }

  public getShipLocation(shipLocationId: number): Observable<ShipLocation> {
    let url = this.apiService.shipLocationsUrl;
    url += `/${shipLocationId}`;

    return this.apiService.get(url).map((response: ShipLocation) => response);
  }

  private buildDataUrl(query: ShipLocationSearchParams) {
    const params = {};

    if (query.restrictSearch !== null && query.restrictSearch !== undefined) {
      params['restrictSearch'] = query.restrictSearch;
    }
    if (query.plantName) {
      params['plantName'] = query.plantName;
    }
    if (query.plantNumber) {
      params['plantNumber'] = query.plantNumber;
    }
    if (query.fields) {
      params['fields'] = query.fields.join(',');
    }

    let url = this.apiService.shipLocationsUrl;
    url += '&';
    url += SearchQueryBuilderService.build(params, query);

    return url;
  }
}
