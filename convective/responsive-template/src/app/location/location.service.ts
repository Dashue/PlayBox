import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '../shared/api/api.service';
import {LookupFieldResponse, LookupFieldResult} from '../models';
import {SearchQueryBuilderService} from '../shared/search-query-builder-service';
import {LocationResponse} from './location-response';
import {LocationSearchParams} from './location-search-params';
import {CreateOrUpdateLocation, Location} from './location';

@Injectable()
export class LocationService {

  private dataUrl = this.apiService.baseUrl + '/location';
  private typeaheadUrl = this.apiService.baseUrl + '/typeAheadDropDown&dataTypeKey=TaSelectLocation';

  constructor(private apiService: ApiService) {
  }
  public searchByKey(inputValue: string, recordsReturned: number = 7): Observable<LookupFieldResult[]> {
    let url = this.typeaheadUrl;
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
    let url = this.typeaheadUrl;
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
  public getLocationData(query: LocationSearchParams): Observable<LocationResponse> {
    const url = this.buildItemsUrl(query);
    return this.apiService.get(url).map((result: LocationResponse) => result);
  }

  public getLocationReport(query: LocationSearchParams): Observable<Blob> {
    const url = this.buildItemsUrl(query);
    return this.apiService.getFile(url);
  }

  getLocation(locationId: string): Observable<Location> {
    const url = `${this.dataUrl}/${locationId}`;
    return this.apiService.get(url).map((result: {data: Location[]}) => result.data[0]);
  }

  createLocation(location: CreateOrUpdateLocation): Observable<boolean> {
    const url = `${this.dataUrl}`;
    return this.apiService.post(url, {data: location}).map(x => !!x);
  }

  updateLocation(location: Location): Observable<boolean> {
    const url = `${this.dataUrl}/${location.locationId}`;
    return this.apiService.put(url, {data: location}).map(x => !!x);
  }

  deleteLocation(locationId: string): Observable<boolean> {
    const url = `${this.dataUrl}/${locationId}`;
    return this.apiService.delete(url).map(x => !!x);
  }

  private buildItemsUrl(query: LocationSearchParams): string {
    const date = query.effectiveDate;

    const params = {};
    if (query.locationKey) {
      params['locationKey'] = query.locationKey;
    }

    if (query.locationDesc) {
      params['locationDesc'] = query.locationDesc;
    }

    if (date) {
      params['effectiveDate'] = date;
    }

    if (query.status) {
      params['status'] = query.status;
    }

    let url = this.dataUrl;
    url += '&';
    url += SearchQueryBuilderService.build(params, query);

    return url;
  }
}
