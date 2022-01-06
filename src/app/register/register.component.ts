import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup
  public firstNameFieldName: string;
  public lastNameFieldName: string;
  public fields: string[]

  constructor() { 
    this.registerForm = new FormGroup({

    });

    this.fields = [
      'First Name',
      'Last Name',
      'Email',
      'Username',
      'Password',
      'Confirm Password',
      'Birthday'
    ]
    this.firstNameFieldName = 'First Name';
    this.lastNameFieldName = 'Last Name';
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {}
}
