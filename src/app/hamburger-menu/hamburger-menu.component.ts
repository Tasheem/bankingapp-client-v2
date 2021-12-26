import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public handleHamburgerClick(): void {
    const mainContainer = document.querySelector('.hm-container');
    mainContainer?.classList.toggle('engaged');
  }
}
