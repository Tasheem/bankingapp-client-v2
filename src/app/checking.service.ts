import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICheckingAccount } from './models/checking-account';

@Injectable({
  providedIn: 'root'
})
export class CheckingService {

  private url = 'http://localhost:8080/bankingapp/api/checking';

  constructor(private http: HttpClient) { }

  public getCheckingAccount(): Observable<ICheckingAccount> | Observable<never> {
    const token = window.sessionStorage.getItem('Token');

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', `${token}`);

    try {
      return this.http.get<ICheckingAccount>(this.url, {
        headers: httpHeaders
      });
    } catch(err: any) {
      return this.handleError(err);
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if(error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.'));
  }
}
