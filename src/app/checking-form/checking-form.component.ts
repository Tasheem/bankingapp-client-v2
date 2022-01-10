import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckingService } from '../services/checking.service';

@Component({
  selector: 'app-checking-form',
  templateUrl: './checking-form.component.html',
  styleUrls: ['./checking-form.component.css']
})
export class CheckingFormComponent implements OnInit {

  public form: FormGroup
  public hasSubmitted = false;

  constructor(private checkingService: CheckingService) {
    this.form = new FormGroup({
      userID: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  public getFormControl(name: string): FormControl {
    const control = this.form.get(name);
    return control as FormControl;
  }

  public onSubmit(): void {
    const userID = this.form.get('userID')?.value;
    const balance = this.form.get('balance')?.value;

    const data: { [key: string]: string } = {
      userID: userID,
      balance: balance
    }

    const observable = this.checkingService.createCheckingAccount(data);

    observable.subscribe({
      next: (data) => {
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
