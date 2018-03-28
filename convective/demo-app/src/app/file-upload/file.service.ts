import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export interface HfcFile {
  ID: number;
  FILE_NAME: string;
  FILE_DATA: string[];
  FILE_CAT: string;
  FILE_URL: string;
}

@Injectable()
export class FileService {
  private baseUrl: string;
  public fileUrl;
  public apiKeyOverride: string;

  constructor(private _http: HttpClient) {
    this.baseUrl = 'http://lpcoswas1d.hfc.ad:9181/cf11ext/coldfusion/hfcservices/index.cfm?endpoint=';
    this.fileUrl = this.baseUrl + '/processfile'
  }

  getFiles(): Observable<HfcFile[]> {

    return this._http.get(this.fileUrl, {headers: this.headers()})
      .catch(this.handleError);
  }

  getFile(id: number): Observable<HfcFile> {
    if (id === 0) {
      const file: HfcFile = {
        FILE_NAME: null,
        ID: 0,
        FILE_DATA: null,
        FILE_CAT: null,
        FILE_URL: null
      };

      return Observable.of(file);
    }
    const url = `${this.fileUrl}&id=${id}&showFile=Y`;
    return this._http.get(url, {headers: this.headers()})
      .catch(this.handleError);
  }

  public deleteFile(id: number): Observable<Response> {
    const url = `${this.fileUrl}&id=${id}`;
    return this._http.delete(url, {headers: this.headers()})
      .catch(this.handleError);
  }

  private headers(): HttpHeaders {
    return new HttpHeaders().set('X-APIKEY', this.apiKeyOverride);
  }

  private handleError(error: any) {
    return Observable.throw(error.statusText || 'Server error');
  }
}
