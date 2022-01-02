import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'deposit-withdraw',
  templateUrl: './deposit-withdraw.component.html',
  styleUrls: ['./deposit-withdraw.component.css']
})
export class DepositWithdrawComponent implements OnInit {
  public form: FormGroup;
  public isSending;
  public amountInFocus;
  public amountFieldIsClear;
  public destinationInFocus;
  public destinationFieldIsClear;

  constructor() { 
    this.form = new FormGroup({
      amount: new FormControl(),
      destination: new FormControl()
    })

    this.isSending = false;
    this.amountInFocus = false;
    this.amountFieldIsClear = true;
    this.destinationInFocus = false;
    this.destinationFieldIsClear = true;
  }

  ngOnInit(): void {
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
    
    if(target.id === 'amount-input')
      this.amountInFocus = false;
    else
      this.destinationInFocus = false;

    if(target.id === 'amount-input') {
      this.amountFieldIsClear = inputValue.length === 0 ? true : false;
    } else {
      this.destinationFieldIsClear = inputValue.length === 0 ? true : false;
    }
  }
}
