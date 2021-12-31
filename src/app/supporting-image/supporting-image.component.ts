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
  public editBounded: (e: Event) => void;
  public cancelBounded: (e: Event) => void;
  public editGenderBounded: () => void;
  public cancelEditGenderBounded: () => void;

  constructor(private service: CheckingService) {
    this.checkingAccount = null;
    // Bound functions: https://stackoverflow.com/questions/54129535/angular-6-add-event-handler-to-dynamically-created-html-element
    this.editBounded = this.edit.bind(this);
    this.cancelBounded = this.cancel.bind(this);
    this.editGenderBounded = this.editGender.bind(this);
    this.cancelEditGenderBounded = this.cancelEditGender.bind(this);
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  public editGender(): void {
    const editBtn = document.querySelector('#gender-btn') as HTMLElement;
    const genderCard = document.querySelector('#gender-card') as HTMLElement;

    const children = genderCard.childNodes;
    children.forEach((child) => {
      const element = child as HTMLElement;
      if(element.id === 'gender-flex-container')
        element.style.display = 'none'
      else
        element.style.display = 'block'
    });

    if(editBtn.removeAllListeners)
      editBtn.removeAllListeners();

    editBtn.textContent = 'Undo';
    editBtn.addEventListener('click', this.cancelEditGenderBounded);
  }

  public cancelEditGender(): void {
    const editBtn = document.querySelector('#gender-btn') as HTMLElement;
    const genderCard = document.querySelector('#gender-card') as HTMLElement;

    const children = genderCard.childNodes;
    children.forEach((child) => {
      const element = child as HTMLElement;
      if(element.id === 'gender-flex-container')
        element.style.display = 'flex';
      
      if(element.className === 'radio-buttons')
        element.style.display = 'none';
      else if(element.className === 'pronoun-dropdown')
        element.style.display = 'none';
      else if(element.id === 'submit-gender')
        element.style.display = 'none';
    });

    if(editBtn.removeAllListeners)
      editBtn.removeAllListeners();

    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', this.editGenderBounded);
  }

  public edit(e: Event): void {
    const editBtn = e.target as HTMLElement;
    const card = editBtn.parentElement;
    const children = card?.children;

    if(children == undefined)
      return;

    let flexContainer = null;
    let inputField = null;
    for(let i = 0; i < children.length; i++) {
      if(flexContainer != null && inputField != null)
        break;

      if(children[i].className === 'value-containers') 
        flexContainer = children[i] as HTMLElement;
      else if(children[i].className === 'field-boxes')
        inputField = children[i] as HTMLElement;
    }

    // Swap display of data with display of input field
    flexContainer!.style.display = 'none';
    inputField!.style.display = 'block';

    // Making sure removeAllListeners() is defined since 
    // it is an optional method.
    if(editBtn.removeAllListeners)
      editBtn.removeAllListeners();

    const id = card?.id;
    if(id === 'first-name-card')
      editBtn.addEventListener('click', this.cancelBounded);
    else if(id === 'last-name-card')
      editBtn.addEventListener('click', this.cancelBounded)
    else if(id === 'email-card')
      editBtn.addEventListener('click', this.cancelBounded);
    else if(id === 'bday-card')
      editBtn.addEventListener('click', this.cancelBounded);

    editBtn.textContent = 'Undo';
  }

  public cancel(e: Event): void {
    const editBtn = e.target as HTMLElement;
    const card = editBtn.parentElement;
    const children = card?.children;

    if(children == undefined)
      return;

    let flexContainer: HTMLElement | undefined;
    let inputField: HTMLElement | undefined;
    for(let i = 0; i < children.length; i++) {
      if(flexContainer && inputField)
        break;

      if(children[i].className === 'value-containers') 
        flexContainer = children[i] as HTMLElement;
      else if(children[i].className === 'field-boxes')
        inputField = children[i] as HTMLElement;
    }

    // Erase any input user might have entered in text field.
    (<HTMLInputElement>inputField).value = '';
    // Swap display of data with display of input field.
    inputField!.style.display = 'none';
    flexContainer!.style.display = 'flex';

    // Making sure removeAllListeners() is defined since 
    // it is an optional method.
    if(editBtn.removeAllListeners)
      editBtn.removeAllListeners();

      const id = card?.id;
      if(id === 'first-name-card')
        editBtn.addEventListener('click', this.editBounded);
      else if(id === 'last-name-card')
        editBtn.addEventListener('click', this.editBounded)
      else if(id === 'email-card')
        editBtn.addEventListener('click', this.editBounded);
        else if(id === 'bday-card')
      editBtn.addEventListener('click', this.editBounded);
  
      editBtn.textContent = 'Edit';
  }

  public isLoggedIn(): void {
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
      
      if(this.checkingAccount != undefined && this.checkingAccount.balance < 0)
      balanceVal.style.color = 'rgba(202, 4, 4, 0.795)';
      
      if(typeof this.checkingAccount?.balance === 'string') {
        balanceVal.textContent = `${this.checkingAccount?.balance}`;
        balanceVal.style.color = 'black';
      }
      else
        balanceVal.textContent = `$${this.checkingAccount?.balance}`;

      accVal.textContent = `${this.checkingAccount?.accountNumber}`;
    }

    const handleError = (error: Error) => {
      const checking: ICheckingAccount = {
        id: '',
        accountNumber: 'N/A',
        balance: 'N/A',
        userID: '',
        dateCreated: ''
      }

      console.error(error);
      callback(checking);
    }
    
    const observer = {
      next: callback,
      error: handleError,
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
