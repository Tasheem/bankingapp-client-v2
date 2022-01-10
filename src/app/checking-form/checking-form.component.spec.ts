import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingFormComponent } from './checking-form.component';

describe('CheckingFormComponent', () => {
  let component: CheckingFormComponent;
  let fixture: ComponentFixture<CheckingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
