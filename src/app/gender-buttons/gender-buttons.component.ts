import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gender-buttons',
  templateUrl: './gender-buttons.component.html',
  styleUrls: ['./gender-buttons.component.css']
})
export class GenderButtonsComponent implements OnInit {

  public customGenderSelected = false;
  public errorMsg = '';
  public isError = false;
  @Output() public genderChangeEvent = new EventEmitter<string>();
  @Output() public pronounChangeEvent = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  private getInputTarget(element: HTMLElement): HTMLInputElement {
    if(element.nodeName === 'BUTTON')
      return element.children[0] as HTMLInputElement;
    else if(element.nodeName === 'LABEL')
      return element.previousSibling as HTMLInputElement;
    else
      return element as HTMLInputElement;
  }

  public radioButtonHandler(event: Event): void {
    const target = this.getInputTarget(event.target as HTMLElement);
    const radioButtons = Array.from(document.querySelectorAll('.radio-buttons'));

    for(const radioBtn of radioButtons) {
      const radioChildren = radioBtn.childNodes;
      const input = <HTMLInputElement> radioChildren[0];

      if(input.id === target.id) {
        input.checked = true;
        this.genderChangeEvent.emit(input.value);
        if(input.id === 'radio-custom')
          this.customGenderSelected = true;
        else {
          this.customGenderSelected = false;
          this.pronounChangeEvent.emit();
        }
      } else {
        input.checked = false;
      }
    }
  }

  public dropdownListHandler(): void {
    const selectElement = <HTMLInputElement> document.getElementById('pronoun-select');
    this.pronounChangeEvent.emit(selectElement.value);
  }
}
