import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => InputComponent
      ),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() fieldName: string | undefined;
  @Input() fieldType: string | undefined;
  @Input() formControl: FormControl | null = null;
  @Input() form: FormGroup | null = null;
  public inFocus: boolean = false;
  public errorMsg: string;

  public value: string;
  public changed: ((value: string) => void);
  public touched: (() => void);

  constructor() {
    this.value = '';
    this.changed = () => {};
    this.touched = () => {};
    this.errorMsg = '';
  }

  ngOnInit(): void {
    this.errorMsg = `The ${this.fieldName} field is required`;
  }

  public onChange(e: Event): void {
    const value: string = (<HTMLInputElement> e.target).value;
    this.changed(value);

    if(this.formControl?.errors) {
      if(this.formControl.errors['required'])
        this.errorMsg = `The ${this.fieldName} field is required`;
      else if(this.formControl.errors['email'])
        this.errorMsg = 'The email must be in the format something@email.com';
      else if(this.formControl.errors['pattern'])
        this.errorMsg = 'Birthday must be of the format 1900-01-01';
      else if(this.formControl.errors['minlength'])
        this.errorMsg = `The ${this.fieldName} field must have a length of at least 3`;
      else if(this.formControl.errors['mismatch'])
        this.errorMsg = 'The passwords do not match';
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: (value: string) => void): void {
    this.changed = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public setFocus(value: boolean) {
    this.inFocus = value;
  }
}
