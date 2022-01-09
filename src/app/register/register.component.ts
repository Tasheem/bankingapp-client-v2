import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { IUser } from '../models/user';
import { UserService } from '../services/user.service';
import { matchPasswords } from '../validators/password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public inputFields: string[];
  public gender = '';
  public preferredPronoun: string | undefined;
  public form: FormGroup
  public hasSubmitted = false;

  constructor(private fb: FormBuilder, private userService: UserService) { 
    this.inputFields = [
      'First Name',
      'Last Name',
      'Email',
      'Username',
      'Password',
      'Confirm Password',
      'Birthday'
    ];

    const formControls = this.inputFields.reduce((result, currentValue) => {
      if(currentValue === 'Email')
        result[currentValue] = ['', [Validators.required, Validators.email]];
      else if(currentValue === 'Birthday')
        result[currentValue] = ['', [Validators.required, 
          Validators.pattern(/((19[0-9][0-9])|(20[0-2][0-9]))-((0[1-9])|(1[0-2]))-(([0-2][0-9])|(3[0-1]))/)]];
      else if(currentValue === 'Confirm Password')
        result[currentValue] = ['', [Validators.required, matchPasswords]]
      else
        result[currentValue] = ['', [Validators.required, Validators.minLength(3)]];

      return result;
    }, <{[key: string]: any[]}> {});

    this.form = this.fb.group(formControls);
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log(this.form);
  }

  public setGender(gender: string): void {
    this.gender = gender;
  }

  public setPronoun(pronoun: string | undefined): void {
    this.preferredPronoun = pronoun;
  }

  public getFormControl(name: string): FormControl {
    const control = this.form.get(name);
    return control as FormControl;
  }

  public onSubmit(): void {
    const userData: {[key: string]: string} = {};
    const components = Array.from(document.getElementsByTagName('app-input'));
    components.forEach(component => {
      const mainContainer = component.children[0];
      const inputTag = <HTMLInputElement> mainContainer.children[0];
      const placeholderContainer = mainContainer.children[1];
      const placeholderSpan = <HTMLElement> placeholderContainer.children[1];

      let fieldName = placeholderSpan.innerText.toLowerCase();
      const value = inputTag.value;

      if(fieldName === 'first name')
        fieldName = 'firstName';
      else if(fieldName === 'last name')
        fieldName = 'lastName';
      else if(fieldName === 'confirm password')
        return;

      userData[fieldName!] = value;
    });

    userData['gender'] = this.gender.toUpperCase();
    
    if(this.preferredPronoun)
      userData['preferredPronoun'] = this.preferredPronoun;

    const observable = this.userService.createUser(userData);
    observable.subscribe({
      next: (data) => {
        setTimeout(() => {
          this.hasSubmitted = true;
          window.location.href = 'http://localhost:4200/';
        }, 1500)
      },
      error: (err: Error) => console.error(err)
    });
  }
}
