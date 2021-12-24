import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn = false;

  constructor() { }

  ngOnInit(): void {
    // Check logged in status anytime there is a change.
    this.checkStatus();
  }

  // Method used to update whether a user is signed in.
  public checkStatus(): void {
    const token = window.sessionStorage.getItem('Token');
    if(token != null)
      this.isLoggedIn = true;
    else
      this.isLoggedIn = false;
  }
}
