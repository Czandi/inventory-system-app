import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportPageComponent } from './raport-page.component';

describe('RaportPageComponent', () => {
  let component: RaportPageComponent;
  let fixture: ComponentFixture<RaportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaportPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
