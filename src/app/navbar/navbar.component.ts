import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn = false;
  public firstname = '';

  constructor() { }

  ngOnInit(): void {
    // Check logged in status anytime there is a change.
    this.checkStatus();
  }

  // Method used to update whether a user is signed in.
  public checkStatus(): void {
    console.log('checkStatus() Reached!');
    const token = window.sessionStorage.getItem('Token');
    if(token != null) {
      this.isLoggedIn = true;
      const name = window.sessionStorage.getItem('Name');

      if(name != null)
        this.firstname = name;
    }
    else
      this.isLoggedIn = false;
  }

  public logout(): void {
    window.sessionStorage.removeItem('Token');
    window.sessionStorage.removeItem('Name');

    // redirecting
    window.setTimeout(function() {
        window.location.href = 'http://localhost:4200/';
    }, 0);
  }
}
