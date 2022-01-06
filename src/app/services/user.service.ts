import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/bankingapp/api/user/individual';
  private token: string | null;

  constructor(private http: HttpClient) { 
    this.token = window.sessionStorage.getItem('Token');
  }

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

  public updateUser(target: HTMLElement, value: string): Observable<Object> {
    let queryParam: string | undefined;
    if(target.id === 'fn-field')
      queryParam = 'firstname';
    else if(target.id === 'ln-field')
      queryParam = 'lastname';
    else if(target.id === 'email-field')
      queryParam = 'email';
    else if(target.id === 'bday-field')
      queryParam = 'birthday';

    const destination = `http://localhost:8080/bankingapp/api/user?${queryParam}=${value}`;

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', `${this.token}`);

    try {
      return this.http.put(destination, null, {
        headers: httpHeaders
      });
    } catch(err: any) {
      return this.handleError(err);
    }
  }

  public updateGender(gender: string, preferredPronoun: string | undefined): Observable<Object> {
    let destination: string | undefined;
    if(preferredPronoun === undefined)
      destination = `http://localhost:8080/bankingapp/api/user?gender=${gender}&preferredPronoun=${null}`;
    else
      destination = `http://localhost:8080/bankingapp/api/user?gender=${gender}&preferredPronoun=${preferredPronoun}`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', `${this.token}`);

    try {
      return this.http.put(destination, null, {
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
