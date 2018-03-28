import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth.service';

@Injectable()
export class ApiService {
  public taffyEndpointQuery = '?endpoint=';
  public baseUrl = `${environment.apiServerUrl}${this.taffyEndpointQuery}`;
  public typeAheadDropDownUrl = '/typeAheadDropDown';
  public itemsUrl = `${this.baseUrl}/items`;
  public brandsUrl = `${this.baseUrl}/brands`;
  public customersUrl = `${this.baseUrl}/customers`;
  public shipLocationsUrl = `${this.baseUrl}/shipLocations`;
  public itemPriceListUrl = `${this.baseUrl}/itemPriceList`;
  public brandPriceListUrl = `${this.baseUrl}/brandPriceList`;
  public customerConfirmationsUrl = `${this.baseUrl}/confirmations`;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  // noinspection ReservedWordAsName
  public delete(url: string): Observable<string> {
    return this.http.delete(url, {headers: this.headers(), responseType: 'text'});
  }

  public get(url: string): Observable<Object> {
    return this.http.get(url, {headers: this.headers()});
  }

  public getFile(url: string, defaultName: string = 'no_name'): Observable<Blob> {

    return this.http.get(url, {headers: this.headers(), responseType: 'blob', observe: 'response'})
      .map((res: HttpResponse<Blob>) => {
        if (!res.headers.has('content-type')) {
          throw new Error('Response is missing content-type header');
        }

        if (!res.headers.has('content-disposition')) {
          throw new Error('Response is missing content-disposition header');
        }

        const type = res.headers.get('Content-Type');
        const disposition = res.headers.get('Content-Disposition');

        let fileName = defaultName;
        const match = disposition.match(/.*filename=\"?([^;\"]+)\"?.*/);
        if (match[1]) {
          fileName = match[1];
        }

        const blob: any = res.body;
        blob.name = fileName;
        blob.lastModifiedDate = new Date();
        return blob;
      });
  }

  public post(url: string, body: any): Observable<Object> {
    return this.http.post(url, body, {headers: this.headers()});
  }

  public put(url: string, body: any): Observable<Object> {
    return this.http.put(url, body, {headers: this.headers()});
  }

  private headers(): HttpHeaders {
    return new HttpHeaders().set('X-APIKEY', this.authService.apiKey);
  }
}
