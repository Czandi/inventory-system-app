import { DateService } from "./../../core/services/date.service";
import { HistoryService } from "./../../core/services/history.service";
import { FormControl, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { DeviceService } from "./../../core/services/device.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-device-page",
  templateUrl: "./device-page.component.html",
  styleUrls: ["./device-page.component.scss", "../record-page.component.scss"],
})
export class DevicePageComponent implements OnInit {
  public device;
  public deviceForm;
  public deviceHistory;

  constructor(
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.activatedRoute.queryParams
      .subscribe((params) => {
        if (params["id"] !== undefined) {
          this.deviceService
            .getSingleDevice(+params["id"])
            .subscribe((device) => {
              this.device = device;
              console.log(this.device);
              this.getDeviceHistory();
              this.insertInputValue(device);
            });
        }
      })
      .unsubscribe();
  }

  getDeviceHistory() {
    this.historyService
      .getSingleDeviceHistory(1, this.device.id)
      .subscribe((history) => {
        this.deviceHistory = history.content;
        console.log(history);
      });
  }

  initFormGroup() {
    this.deviceForm = new FormGroup({
      serialNumber: new FormControl("", Validators.required),
      deviceModel: new FormControl("", Validators.required),
      deviceBarCode: new FormControl("", Validators.required),
      deviceType: new FormControl("", Validators.required),
      deviceRoom: new FormControl("", Validators.required),
      deviceOwner: new FormControl("", Validators.required),
      deviceSet: new FormControl("", Validators.required),
      deviceComment: new FormControl(""),
    });
  }

  insertInputValue(device) {
    let serialNumber = device.serialNumber;
    let modelName = device.model.name;
    let typeName = device.model.type.name;
    let roomName = device.room.name;
    let ownerName = device.owner.name;
    let barCode = device.barCode;
    let setName = device.deviceSet.name;
    let comment = device.comments;

    this.deviceForm.controls["serialNumber"].setValue(serialNumber);
    this.deviceForm.controls["deviceModel"].setValue(modelName);
    this.deviceForm.controls["deviceType"].setValue(typeName);
    this.deviceForm.controls["deviceRoom"].setValue(roomName);
    this.deviceForm.controls["deviceOwner"].setValue(ownerName);
    this.deviceForm.controls["deviceBarCode"].setValue(barCode);
    this.deviceForm.controls["deviceSet"].setValue(setName);
    this.deviceForm.controls["deviceComment"].setValue(comment);
  }

  getDate(fullDate) {
    return DateService.getDate(fullDate);
  }
}
