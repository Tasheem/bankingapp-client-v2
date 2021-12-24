import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() { }

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

    console.log(`Username: ${username}\nPassword: ${password}`);
  }
}
