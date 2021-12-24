import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://localhost:8080/bankingapp/api/login';
  constructor(private http: HttpClient) { }

  public login(user: User): void {
    const response = this.http.post(this.url, user);
  }
}
