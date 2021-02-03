import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBarcodeAlertComponent } from './add-barcode-alert.component';

describe('AddBarcodeAlertComponent', () => {
  let component: AddBarcodeAlertComponent;
  let fixture: ComponentFixture<AddBarcodeAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBarcodeAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBarcodeAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
