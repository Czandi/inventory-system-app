import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DeviceSetService } from "app/core/services/device-set.service";
import { SubjectService } from "app/core/services/subject.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-update-set",
  templateUrl: "./update-set.component.html",
  styleUrls: [
    "./update-set.component.scss",
    "../update-records.component.scss",
  ],
})
export class UpdateSetComponent implements OnInit, OnDestroy {
  @ViewChild("alertBox") alertBox;
  @ViewChild("deviceSetInput") deviceSetInput;

  public deviceSetAccepted = false;
  public deviceSetNames = [];
  public newRecord;

  private setIds = [];
  private alertSub: Subscription;
  private deviceSetServiceSub: Subscription;

  constructor(
    private deviceSetService: DeviceSetService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.getAutoCompleteData();
    this.createAlertClosingListener();
  }

  ngOnDestroy() {
    this.alertSub.unsubscribe();
    this.deviceSetServiceSub.unsubscribe();
  }

  getAutoCompleteData() {
    this.deviceSetServiceSub = this.deviceSetService
      .getAllDeviceSets()
      .subscribe((data) => {
        for (let set of data) {
          this.deviceSetNames.push(set.name);
          this.setIds[set.name] = set.id;
        }
      });
  }

  createAlertClosingListener() {
    this.alertSub = this.subjectService.reloadAddRecordPageData.subscribe(
      () => {
        this.getAutoCompleteData();
      }
    );
  }

  deviceSetSelectSwitcher() {
    let value = this.deviceSetInput.nativeElement.value;
    if (value === null || value === "") {
      this.deviceSetInput.nativeElement.classList.add("invalid");
    } else if (this.deviceSetNames.includes(value)) {
      this.deviceSetInput.nativeElement.classList.remove("invalid");
      this.deviceSetAccepted = !this.deviceSetAccepted;
    } else {
      this.deviceSetInput.nativeElement.classList.remove("invalid");
      this.newRecord = [];
      this.newRecord.push({
        text: "TABLE_HEADERS.DEVICE.SET_NUMBER",
        name: value,
        type: "deviceSet",
      });
      this.alertBox.openAlert();
    }
  }

  checkName() {
    let value = this.deviceSetInput.nativeElement.value;
    if (value !== null || value !== "") {
      this.deviceSetInput.nativeElement.classList.remove("invalid");
    }
  }

  update() {}
}
