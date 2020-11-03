import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NewRecordsAlertBoxComponent } from "./new-records-alert-box.component";

describe("AlertBoxComponent", () => {
  let component: NewRecordsAlertBoxComponent;
  let fixture: ComponentFixture<NewRecordsAlertBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewRecordsAlertBoxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecordsAlertBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
