import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() fieldName: string | undefined;
  public inFocus: boolean;
  public isClear: boolean;
  public touched: boolean;

  constructor() {
    this.inFocus = false;
    this.isClear = true;
    this.touched = false;
  }

  ngOnInit(): void {
  }

  public handleFocus(): void {
    this.inFocus = true;
  }

  public handleBlur(inputValue: string): void {
    this.inFocus = false;
    this.isClear = inputValue.length === 0 ? true : false;
    this.touched = true;
  }
}
