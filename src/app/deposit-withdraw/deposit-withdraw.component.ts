import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import { ITransaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'deposit-withdraw',
  templateUrl: './deposit-withdraw.component.html',
  styleUrls: ['./deposit-withdraw.component.css']
})
export class DepositWithdrawComponent implements OnInit {
  public form: FormGroup;
  public isSending: boolean;
  public amountInFocus: boolean;
  public amountFieldIsClear: boolean;
  public destinationInFocus: boolean;
  public destinationFieldIsClear: boolean;
  public amountErrMsg: string;
  public destinationErrMsg: string;

  constructor(private service: TransactionService) { 
    this.form = new FormGroup({
      amount: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required])
    })

    this.isSending = false;
    this.amountInFocus = false;
    this.amountFieldIsClear = true;
    this.destinationInFocus = false;
    this.destinationFieldIsClear = true;
    this.amountErrMsg = '';
    this.destinationErrMsg = '';
  }

  ngOnInit(): void {
  }

  public submitTransaction(): void {
    const amount = <FormControl> this.form.get('amount');
    const destination = <FormControl> this.form.get('destination');
    let transactionCategory: 'DEPOSIT' | 'WITHDRAWAL' | 'SEND' | undefined;

    const radioDeposit = <HTMLInputElement> document.getElementById('radio-deposit');
    const radioWithdraw = <HTMLInputElement> document.getElementById('radio-withdraw');

    if(radioDeposit.checked)
      transactionCategory = 'DEPOSIT'
    else if(radioWithdraw.checked)
      transactionCategory = 'WITHDRAWAL'
    else
      transactionCategory = 'SEND'

    const transaction: ITransaction = {
      amount: amount.value,
      category: transactionCategory
    }

    if(destination.value.length > 0)
      transaction.destinationAccountNumber = destination.value;

    const observer: Partial<Observer<string>> = {
      next: (data: string) => console.log(data),
      error: (err: Error) => console.error(err)
    }

    const observable = this.service.postTransaction(transaction);
    observable.subscribe(observer);

    setTimeout(() => {
      window.location.href = 'http://localhost:4200/';
    }, 1500)
  }

  private getParentBtn(element: HTMLInputElement): HTMLButtonElement {
    return element.parentNode as HTMLButtonElement;
  }

  public selectRadio(e: Event): void {
    let button;
    if((<HTMLElement> e.target).localName === 'input')
      button = this.getParentBtn(e.target as HTMLInputElement);
    else
      button = e.target as HTMLButtonElement;

    const inputField = button.children[0] as HTMLInputElement;
    
    inputField.checked = true;

    const buttons = document.getElementsByClassName('trans-radio');
    const buttonList = Array.from(buttons);
    
    for(const btn of buttonList) {
      if(btn.id === button.id)
        continue;

      const input = btn.children[0] as HTMLInputElement;
      input.checked = false;
    }
    
    const formContainer = document.querySelector('.transaction-form-container') as HTMLElement;
    if(inputField.value === 'Send') {
      this.isSending = true;
      formContainer.style.height = '690px';
    } else {
      this.isSending = false;
      formContainer.style.height = '600px';
    }
  }

  public handleFocus(e: Event): void {
    const target = <HTMLInputElement> e.target;

    if(target.id === 'amount-input')
      this.amountInFocus = true;
    else
      this.destinationInFocus = true;
  }

  public handleBlur(e: Event, inputValue: string): void {
    const target = <HTMLInputElement> e.target;
    
    if(target.id === 'amount-input') {
      this.amountInFocus = false;
      this.amountFieldIsClear = inputValue.length === 0 ? true : false;
    }
    else {
      this.destinationInFocus = false;
      this.destinationFieldIsClear = inputValue.length === 0 ? true : false;
    }
  }

  public get amountControl(): AbstractControl | null {
    return this.form.get('amount');
  }

  public get destinationControl(): AbstractControl | null {
    return this.form.get('destination');
  }
}
