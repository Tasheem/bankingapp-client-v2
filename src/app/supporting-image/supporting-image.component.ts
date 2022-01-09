import { Component, OnInit } from '@angular/core';
import { CheckingService } from '../services/checking.service';
import { ICheckingAccount } from '../models/checking-account';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  public user: User | undefined;
  public editGenderBtnClicked = false;
  public gender: string;
  public preferredPronoun: string | undefined;

  constructor(private service: CheckingService, 
    private userService: UserService) {
    this.checkingAccount = null;
    // Bound functions: https://stackoverflow.com/questions/54129535/angular-6-add-event-handler-to-dynamically-created-html-element
    this.editBounded = this.edit.bind(this);
    this.cancelBounded = this.cancel.bind(this);
    this.editGenderBounded = this.editGender.bind(this);
    this.cancelEditGenderBounded = this.cancelEditGender.bind(this);
    this.gender = '';
  }

  ngOnInit(): void {
    this.isLoggedIn();
    if(this.userLoggedIn)
      this.userInfo();
  }

  public setGender(gender: string): void {
    this.gender = gender;
  }

  public setPronoun(pronoun: string | undefined): void {
    this.preferredPronoun = pronoun;
  }

  public updateGenderHandler(): void {
    const observable = this.userService.updateGender(this.gender, this.preferredPronoun);

    observable.subscribe({
      next: () => {
        this.cancelEditGender();
        this.userInfo();
      },
      error: (err: Error) => console.error(err)
    })
  }

  public updateUserKeyDownHandler(e: KeyboardEvent): void {
    if(e.key !== 'Enter')
      return;

    const input = <HTMLInputElement> e.target;
    const value = input.value;
    if(value === '')
      return;

    const observable = this.userService.updateUser(input, value);

    observable.subscribe({
      next: () => { // reload view with updated data.
        this.userInfo();
        this.cancel(e);
      },
      error: (err: Error) => console.error(err)
    })
  }

  public updateUserFocusHandler(e: FocusEvent): void {
    const target = <HTMLInputElement> e.target;
    const parentNode = <HTMLElement> target.parentNode;
    const children = parentNode.children;

    const btn = Array.from(children).find((child: Element) => 
        (<HTMLElement>child).className === 'card-buttons') as HTMLElement;
    
    // If user hits undo button, do not send update to server.
    if((<HTMLElement> e.relatedTarget)?.id === btn.id)
      return;

    const value = target.value;
    if(value === '')
      return;

    const observable = this.userService.updateUser(target, value);

    observable.subscribe({
      next: () => { // reload view with updated data.
        this.userInfo();
        this.cancel(e);
      },
      error: (err: Error) => console.error(err)
    })
  }

  public userInfo(): void {
    const observable = this.userService.getUser();

    const observer = {
      next: (user: User) => {
        this.user = user;
        /* console.log(this.user); */
      },
      error: (err: Error) => console.error(err),
      complete: () => console.log('User Info Received')
    }

    observable.subscribe(observer);
  }

  public editGender(): void {
    const editBtn = document.querySelector('#gender-btn') as HTMLElement;
    this.editGenderBtnClicked = true;

    if(editBtn.removeAllListeners)
      editBtn.removeAllListeners();

    editBtn.textContent = 'Undo';
    editBtn.addEventListener('click', this.cancelEditGenderBounded);
  }

  public cancelEditGender(): void {
    const editBtn = document.querySelector('#gender-btn') as HTMLElement;
    this.editGenderBtnClicked = false;

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
    const card = (e.target as HTMLElement).parentElement;
    const children = card?.children;
    if(!children)
      return;

    let editBtn = e.target as HTMLElement;
    if(editBtn.className !== 'card-buttons') { // find edit btn
      for(let i = 0; i < children?.length; i++) {
          if(children[i].className === 'card-buttons')
            editBtn = children[i] as HTMLElement;
      }
    }

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
    (<HTMLInputElement> inputField).value = '';
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
      
      if(!this.checkingAccount || typeof this.checkingAccount?.balance === 'string') {
        balanceVal.style.color = 'black';
      }
    }

    const handleError = (e: Error) => {
      const json = (<HttpErrorResponse> e).error as HttpErrorResponse;

      // The user has to login again.
      if(json.message?.toLowerCase() === 'the token has expired') {
        window.sessionStorage.clear();
        window.location.href = 'http://localhost:4200/';
      }

      const checking: ICheckingAccount = {
        id: '',
        accountNumber: 'N/A',
        balance: 'N/A',
        userID: '',
        dateCreated: ''
      }

      console.error(e);
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
