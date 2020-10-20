import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTypeTableComponent } from './device-type-table.component';

describe('DeviceTypeTableComponent', () => {
  let component: DeviceTypeTableComponent;
  let fixture: ComponentFixture<DeviceTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceTypeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
