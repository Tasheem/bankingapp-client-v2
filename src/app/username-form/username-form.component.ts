import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'username-form',
  templateUrl: './username-form.component.html',
  styleUrls: ['./username-form.component.css']
})
export class UsernameFormComponent implements OnInit {

  public form: FormGroup
  public hasSubmitted = false;

  constructor(private userService: UserService) { 
    this.form = new FormGroup({
      username: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  public getFormControl(name: string): FormControl {
    const control = this.form.get(name);
    return control as FormControl;
  }

  public onSubmit(): void {
    const username = this.form.get('username')?.value;
    const observable = this.userService.updateUsername(username);

    observable.subscribe({
      next: () => {
        this.hasSubmitted = true;
        setTimeout(() => {
          window.location.href = 'http://localhost:4200/';
        }, 1500);
      },
      error: (err: Error) => {
        console.log('Error has occured:');
        console.error(err);
      }
    })
  }

}
