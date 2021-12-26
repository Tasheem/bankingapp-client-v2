import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'supporting-image',
  templateUrl: './supporting-image.component.html',
  styleUrls: ['./supporting-image.component.css']
})
export class SupportingImageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public isLoggedIn(): boolean {
    const token = window.sessionStorage.getItem('Token');

    if(token == null)
      return false;
    
    return true;
  }
}
