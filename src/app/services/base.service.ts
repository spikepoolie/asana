import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


const endpoint = 'https://www.goemobile.com/tesla/php/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }

  getGoogleMapKey(): Observable<any> {
    return this.http.get(endpoint).pipe(
      map(this.extractData));
  }
}
