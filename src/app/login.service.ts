import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://localhost:8080/bankingapp/api/login';
  constructor(private http: HttpClient) { }

  public requestLogin(user: User): Observable<HttpResponse<User>> {
    try {
      return this.http.post<User>(this.url, user, {
        observe: 'response'
      });
    } catch(error) {
      console.error(error);
      return new Observable<HttpResponse<User>>();
    }
  }
}
