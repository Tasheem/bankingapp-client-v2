import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportingImageComponent } from './supporting-image.component';

describe('SupportingImageComponent', () => {
  let component: SupportingImageComponent;
  let fixture: ComponentFixture<SupportingImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportingImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportingImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
