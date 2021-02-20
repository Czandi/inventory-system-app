import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { DeviceSetService } from "app/core/services/device-set.service";
import { ModelService } from "app/core/services/model.service";
import { OwnerService } from "app/core/services/owner.service";
import { RoomService } from "app/core/services/room.service";
import { DeviceTypeService } from "app/core/services/device-type.service";
import { SubjectService } from "app/core/services/subject.service";
import { Model } from "app/shared/models/model.model";
import { Owner } from "app/shared/models/owner.model";
import { Room } from "app/shared/models/room.model";
import { DeviceSet } from "app/shared/models/deviceSet.model";
import { DeviceType } from "../../models/type.model";

@Component({
  selector: "app-alert-box",
  templateUrl: "./new-records-alert-box.component.html",
  styleUrls: ["./new-records-alert-box.component.scss"],
})
export class NewRecordsAlertBoxComponent implements OnInit {
  @Input() newRecords;
  @ViewChild("alert") alert;

  private addedRecords = [];

  constructor(
    private host: ElementRef,
    private roomSerivce: RoomService,
    private ownerService: OwnerService,
    private deviceSetService: DeviceSetService,
    private modelService: ModelService,
    private deviceTypeService: DeviceTypeService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {}

  closeAlert() {
    this.host.nativeElement.classList.remove("active");
    if (this.addedRecords.length != 0) {
      this.subjectService.reloadAddRecordPageData.next(this.addedRecords);
    }
  }

  openAlert() {
    this.host.nativeElement.classList.add("active");
  }

  addRecord(record) {
    switch (record.type) {
      case "deviceRoom":
        this.addRoom(record);
        break;
      case "deviceModel":
        this.addModel(record);
        break;
      case "deviceOwner":
        this.addOwner(record);
        break;
      case "deviceSet":
        this.addDeviceSet(record);
        break;
    }
  }

  addRoom(room) {
    let newRoom = new Room();
    newRoom.name = room.name.toLowerCase();
    this.roomSerivce.insertRoom(newRoom).subscribe(() => {
      this.removeRecord(room);
    });
  }

  addModel(model) {
    let newModel = new Model();
    newModel.name = model.name.toLowerCase();
    if (model.deviceTypeId === -1) {
      let newDeviceType = new DeviceType();
      newDeviceType.name = model.deviceTypeName.toLowerCase();
      this.deviceTypeService
        .insertDeviceType(newDeviceType)
        .subscribe((deviceType) => {
          newModel.idType = deviceType["id"];
          this.modelService.insertModel(newModel).subscribe(() => {
            this.removeRecord(model);
          });
        });
    } else {
      newModel.idType = model.deviceTypeId;
      this.modelService.insertModel(newModel).subscribe(() => {
        this.removeRecord(model);
      });
    }
  }

  addOwner(owner) {
    let newOnwer = new Owner();
    newOnwer.name = owner.name.toLowerCase();
    this.ownerService.insertOwner(newOnwer).subscribe(() => {
      this.removeRecord(owner);
    });
  }

  addDeviceSet(deviceSet) {
    let newDeviceSet = new DeviceSet();
    newDeviceSet.name = deviceSet.name.toLowerCase();
    this.deviceSetService.insertDeviceSet(newDeviceSet).subscribe(() => {
      this.removeRecord(deviceSet);
    });
  }

  addDeviceType(deviceType) {}

  removeRecord(record) {
    let index = this.newRecords.indexOf(record);
    this.newRecords.splice(index, 1);
    this.addedRecords = record.type;
    this.checkIfNewRecordsIsEmpty();
  }

  checkIfNewRecordsIsEmpty() {
    if (this.newRecords.length === 0) {
      this.host.nativeElement.classList.remove("active");
      this.closeAlert();
    }
  }
}
