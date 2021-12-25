import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { User } from '../models/user';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  public isErrorUsername(): boolean {
    const username = this.loginForm.get('username');
    const untouched = username?.untouched;
    const valid = username?.valid;

    return untouched || valid ? false : true;
  }

  public isErrorPassword(): boolean {
    const password = this.loginForm.get('password');
    const untouched = password?.untouched;
    const valid = password?.valid;

    return untouched || valid ? false : true;
  }

  public onSubmit(): void {
    const username = this.loginForm.get('username');
    const password = this.loginForm.get('password');

    if(username?.value.length < 1 || password?.value.length < 1) {
      username?.markAllAsTouched();
      password?.markAllAsTouched();
      return;
    }

    console.log(`Username: ${username?.value}\nPassword: ${password?.value}`);

    // Send http request for login
    this.loginService
    .requestLogin(new User(username?.value, password?.value))
    .subscribe(resp => {
      console.log(`Response: ${resp}`);
      const token = resp.headers.get('Authorization');
      const name = resp.headers.get('Name');

      /* console.log(resp.headers.keys());
      console.log(`Bearer: ${token}`);
      console.log(`Name: ${name}`); */

      if(token != null && name != null) {
        window.sessionStorage.setItem('Token', token);
        window.sessionStorage.setItem('Name', name);
      } else {
        console.error('Null token or name');
      }
    });

    // Send user feedback
    const form = document.getElementById('login-form');
    const button = document.getElementsByClassName('login-btn')[0] as HTMLElement;
    button.style.display = 'none';

    const div = document.createElement('div');
    div.innerHTML = 'Logging In...';
    div.style.cssText = `color: white;
                  font-size: large;
                  margin-top: 8%;
                  margin-left: 40%;`
                  
    form?.appendChild(div);

    // redirecting
    window.setTimeout(function() {
        window.location.href = 'http://localhost:4200/';
    }, 3000);
  }
}
