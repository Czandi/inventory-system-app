import { DeviceDataValidator } from "./../../shared/deviceDataValidator";
import { DateService } from "./../../core/services/date.service";
import { HistoryService } from "./../../core/services/history.service";
import { FormControl, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { DeviceService } from "./../../core/services/device.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { DeviceSetService } from "app/core/services/device-set.service";
import { DeviceTypeService } from "app/core/services/device-type.service";
import { ModelService } from "app/core/services/model.service";
import { OwnerService } from "app/core/services/owner.service";
import { RoomService } from "app/core/services/room.service";
import { createThis } from "typescript";

@Component({
  selector: "app-device-page",
  templateUrl: "./device-page.component.html",
  styleUrls: ["./device-page.component.scss", "../record-page.component.scss"],
})
export class DevicePageComponent implements OnInit {
  public device;
  public deviceForm;
  public deviceHistory;
  public buttonType = "disable";
  public autocompleteRecords;

  private deviceArray = [];
  private deviceDataValidator;

  constructor(
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService,
    private historyService: HistoryService,
    private modelService: ModelService,
    private deviceTypeService: DeviceTypeService,
    private roomService: RoomService,
    private ownerService: OwnerService,
    private deviceSetService: DeviceSetService
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
              this.mapDeviceToArray();
            });
        }
      })
      .unsubscribe();
    this.deviceDataValidator = new DeviceDataValidator();
    this.getAutoCompleteData();
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

  mapDeviceToArray() {
    this.deviceArray["serialNumber"] = this.device.serialNumber;
    this.deviceArray["deviceModel"] = this.device.model.name;
    this.deviceArray["deviceType"] = this.device.model.type.name;
    this.deviceArray["deviceRoom"] = this.device.room.name;
    this.deviceArray["deviceOwner"] = this.device.owner.name;
    this.deviceArray["deviceBarCode"] = this.device.barCode;
    this.deviceArray["deviceSet"] = this.device.deviceSet.name;
    this.deviceArray["deviceComment"] = this.device.comments;
  }

  getDate(fullDate) {
    return DateService.getDate(fullDate);
  }

  getAutoCompleteData() {
    this.deviceSetService.getAllDeviceSets().subscribe((data) => {
      this.deviceDataValidator.insertNames(data, "deviceSet");
      this.deviceDataValidator.insertIds(data, "deviceSet");
    }).unsubscribe;
    this.deviceTypeService.getAllDeviceTypes().subscribe((data) => {
      this.deviceDataValidator.insertNames(data, "deviceType");
      this.deviceDataValidator.insertIds(data, "deviceType");
    }).unsubscribe;
    this.ownerService.getAllOwners().subscribe((data) => {
      this.deviceDataValidator.insertNames(data, "deviceOwner");
      this.deviceDataValidator.insertIds(data, "deviceOwner");
    }).unsubscribe;
    this.roomService.getAllRooms().subscribe((data) => {
      this.deviceDataValidator.insertNames(data, "deviceRoom");
      this.deviceDataValidator.insertIds(data, "deviceRoom");
    }).unsubscribe;
    this.modelService.getAllModels().subscribe((data) => {
      this.deviceDataValidator.insertNames(data, "deviceModel");
      this.deviceDataValidator.insertIds(data, "deviceModel");
      this.deviceDataValidator.insertModelsWithTypes(data);
    }).unsubscribe;

    this.autocompleteRecords = this.deviceDataValidator.names;
  }

  checkChange() {
    if (
      (this.deviceForm.controls["deviceSet"].value !==
        this.deviceArray["deviceSet"] ||
        this.deviceForm.controls["serialNumber"].value !==
          this.deviceArray["serialNumber"] ||
        this.deviceForm.controls["deviceModel"].value !==
          this.deviceArray["deviceModel"] ||
        this.deviceForm.controls["deviceType"].value !==
          this.deviceArray["deviceType"] ||
        this.deviceForm.controls["deviceRoom"].value !==
          this.deviceArray["deviceRoom"] ||
        this.deviceForm.controls["deviceOwner"].value !==
          this.deviceArray["deviceOwner"] ||
        this.deviceForm.controls["deviceBarCode"].value !==
          this.deviceArray["deviceBarCode"] ||
        this.deviceForm.controls["deviceComment"].value !==
          this.deviceArray["deviceComment"]) &&
      this.buttonType !== "secondary"
    ) {
      this.buttonType = "secondary";
    } else if (this.buttonType === "secondary") {
      this.buttonType = "disable";
    }
  }

  getAttributeName(name) {
    let attribute = "TABLE_HEADERS.DEVICE.";

    switch (name) {
      case "room":
        attribute += "ROOM";
        break;

      case "device_set":
        attribute += "SET_NUMBER";
        break;

      case "owner":
        attribute += "OWNER";
        break;

      default:
        attribute = name;
    }

    return attribute;
  }
}
