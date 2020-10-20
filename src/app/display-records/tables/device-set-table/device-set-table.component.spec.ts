import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSetTableComponent } from './device-set-table.component';

describe('DeviceSetTableComponent', () => {
  let component: DeviceSetTableComponent;
  let fixture: ComponentFixture<DeviceSetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceSetTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
