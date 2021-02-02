import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InputHelperComponent } from './input-helper.component';

describe('InputHelperComponent', () => {
  let component: InputHelperComponent;
  let fixture: ComponentFixture<InputHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputHelperComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
