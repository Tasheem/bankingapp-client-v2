import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public firstNameFieldName: string;
  public lastNameFieldName: string;
  public inputFields: string[];
  public gender = '';
  public preferredPronoun: string | undefined;

  constructor() { 
    this.registerForm = new FormGroup({

    });

    this.inputFields = [
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

  public setGender(gender: string): void {
    this.gender = gender;
  }

  public setPronoun(pronoun: string | undefined): void {
    this.preferredPronoun = pronoun;
  }

  public onSubmit(): void {}
}
