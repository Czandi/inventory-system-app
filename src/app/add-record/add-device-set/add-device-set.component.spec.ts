import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceSetComponent } from './add-device-set.component';

describe('AddDeviceSetComponent', () => {
  let component: AddDeviceSetComponent;
  let fixture: ComponentFixture<AddDeviceSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeviceSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
