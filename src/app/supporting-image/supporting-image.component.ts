import { Component, OnInit } from '@angular/core';
import { CheckingService } from '../services/checking.service';
import { ICheckingAccount } from '../models/checking-account';

@Component({
  selector: 'supporting-image',
  templateUrl: './supporting-image.component.html',
  styleUrls: ['./supporting-image.component.css']
})
export class SupportingImageComponent implements OnInit {

  public userLoggedIn = false;
  public checkingAccount: ICheckingAccount | null;

  constructor(private service: CheckingService) {
    this.checkingAccount = null;
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  ngOnChanges(): void {
    this.isLoggedIn();
  }

  public isLoggedIn(): void {
    console.log('isLoggedIn() Reached!');
    const token = window.sessionStorage.getItem('Token');

    if(token == null) {
      this.userLoggedIn = false;
      return;
    } else {
      this.userLoggedIn = true;
    }

    const callback = (account: ICheckingAccount) => {
      this.checkingAccount = account;

      const balanceVal = document.querySelector('.balance-val') as HTMLElement;
      const accVal = document.querySelector('.acc-val');

      if(balanceVal == null || accVal == null) {
        this.userLoggedIn = false;
        return;
      }
    
      balanceVal.textContent = `$${this.checkingAccount?.balance}`;

      if(this.checkingAccount != undefined && this.checkingAccount.balance < 0)
        balanceVal.style.color = 'rgba(202, 4, 4, 0.795)';
      
      accVal.textContent = `${this.checkingAccount?.accountNumber}`;
    }
    
    const observer = {
      next: callback,
      error: (error: Error) => console.error(error),
      complete: () => console.log('Response Received')
    }

    const observable = this.service.getCheckingAccount();

    if(observable == null) {
      this.userLoggedIn = false;
      return;
    }

    observable.subscribe(observer);
  }
}
