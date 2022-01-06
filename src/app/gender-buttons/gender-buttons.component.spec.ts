import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderButtonsComponent } from './gender-buttons.component';

describe('GenderButtonsComponent', () => {
  let component: GenderButtonsComponent;
  let fixture: ComponentFixture<GenderButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
