import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/bankingapp/api/user/individual';

  constructor(private http: HttpClient) { }

  public getUser(): Observable<User> | Observable<never> {
    const token = window.sessionStorage.getItem('Token');

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', `${token}`);

    try {
      return this.http.get<User>(this.url, {
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
