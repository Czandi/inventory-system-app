import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";

import { Device } from "../shared/models/device.model";
import { RoomService } from "../core/services/room.service";
import { OwnerService } from "../core/services/owner.service";
import { DeviceSetService } from "../core/services/device-set.service";
import { DeviceTypeService } from "../core/services/device-type.service";
import { ModelService } from "../core/services/model.service";
import { DeviceService } from "app/core/services/device.service";
import { SubjectService } from "app/core/services/subject.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Data } from "../shared/data";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-add-device",
  templateUrl: "./add-record.component.html",
  styleUrls: ["./add-record.component.scss"],
})
export class AddRecordComponent implements OnInit, OnDestroy {
  @ViewChild("alertBox") alertBox;

  public newRecords = [];
  public addDeviceData;
  public records: any = {};
  public deviceForm;
  public deviceTypeInactive = false;

  private ids: any = {};
  private modelsWithTypes = [];
  private deviceRoomName: string;
  private deviceModelName: string;
  private deviceOwnerName: string;
  private deviceSetName: string;
  private deviceTypeName: string;
  private typeInputElement;

  private deviceSetSub;
  private deviceTypeSub;
  private deviceOwnerSub;
  private deviceRoomSub;
  private deviceModelSub;
  private alertSub;

  constructor(
    private roomService: RoomService,
    private ownerService: OwnerService,
    private deviceSetService: DeviceSetService,
    private deviceTypeService: DeviceTypeService,
    private modelService: ModelService,
    private deviceService: DeviceService,
    private subjectService: SubjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAutocompleteData();
    this.createAlertClosingListener();
    this.initFormGroup();
    this.addDeviceData = Data.getAddDeviceData();
  }

  ngAfterViewInit() {
    this.typeInputElement = document.getElementById("deviceType");
  }

  ngOnDestroy(): void {
    this.deviceSetSub.unsubscribe();
    this.deviceTypeSub.unsubscribe();
    this.deviceOwnerSub.unsubscribe();
    this.deviceRoomSub.unsubscribe();
    this.deviceModelSub.unsubscribe();
    this.alertSub.unsubscribe();
  }

  initFormGroup() {
    this.deviceForm = new FormGroup({
      serialNumber: new FormControl("", Validators.required),
      deviceModel: new FormControl("", Validators.required),
      deviceType: new FormControl("", Validators.required),
      deviceRoom: new FormControl("", Validators.required),
      deviceOwner: new FormControl("", Validators.required),
      deviceSet: new FormControl("", Validators.required),
      deviceComment: new FormControl(""),
    });
  }

  createAlertClosingListener() {
    this.alertSub = this.subjectService.reloadAddRecordPageData.subscribe(
      (newRecords) => {
        this.getAutocompleteData();
        if (newRecords.indexOf("deviceModel") != -1) {
          setTimeout(() => {
            this.insertDeviceType();
          }, 500);
        }
      }
    );
  }

  private insertModelsWithTypes(data) {
    for (let record of data) {
      this.modelsWithTypes[record.name] = record.type.name;
    }
  }

  private insertIds(data, id) {
    this.ids[id] = [];
    for (let item of data) {
      let itemName = item["name"];
      let itemId = item["id"];
      this.ids[id][itemName] = itemId;
    }
  }

  private insertNames(data, id) {
    this.records[id] = [];
    for (let name of data) {
      let itemId = name["name"];
      this.records[id].push(itemId);
    }
  }

  getAutocompleteData() {
    this.deviceSetSub = this.deviceSetService
      .getAllDeviceSets()
      .subscribe((data) => {
        this.insertNames(data, "deviceSet");
        this.insertIds(data, "deviceSet");
      });
    this.deviceTypeSub = this.deviceTypeService
      .getAllDeviceTypes()
      .subscribe((data) => {
        this.insertNames(data, "deviceType");
        this.insertIds(data, "deviceType");
      });
    this.deviceOwnerSub = this.ownerService.getAllOwners().subscribe((data) => {
      this.insertNames(data, "deviceOwner");
      this.insertIds(data, "deviceOwner");
    });
    this.deviceRoomSub = this.roomService.getAllRooms().subscribe((data) => {
      this.insertNames(data, "deviceRoom");
      this.insertIds(data, "deviceRoom");
    });
    this.deviceModelSub = this.modelService.getAllModels().subscribe((data) => {
      this.insertNames(data, "deviceModel");
      this.insertIds(data, "deviceModel");
      this.insertModelsWithTypes(data);
    });
  }

  addDevice() {
    this.deviceRoomName = this.deviceForm.get("deviceRoom").value;
    let idRoom: number = this.getNameIdFromArray(
      this.deviceRoomName,
      "deviceRoom"
    );
    this.deviceOwnerName = this.deviceForm.get("deviceOwner").value;
    let idOwner: number = this.getNameIdFromArray(
      this.deviceOwnerName,
      "deviceOwner"
    );
    this.deviceSetName = this.deviceForm.get("deviceSet").value;
    let idDeviceSet: number = this.getNameIdFromArray(
      this.deviceSetName,
      "deviceSet"
    );
    this.deviceModelName = this.deviceForm.get("deviceModel").value;
    let idModel: number = this.getNameIdFromArray(
      this.deviceModelName,
      "deviceModel"
    );
    this.deviceTypeName = this.deviceForm.get("deviceType").value;
    let idDeviceType: number = this.getNameIdFromArray(
      this.deviceTypeName,
      "deviceType"
    );
    let serialNumber = this.deviceForm.get("serialNumber").value;
    let comment = this.deviceForm.get("deviceComment").value;

    let device = new Device();
    device.serialNumber = serialNumber.toLowerCase();
    device.idModel = idModel;
    device.idRoom = idRoom;
    device.idOwner = idOwner;
    device.idDeviceSet = idDeviceSet;
    device.comment = comment.toLowerCase();
    if (this.deviceForm.valid) {
      if (this.validateDeviceData(device, idDeviceType)) {
        this.insertDeviceAndRedirect(device);
      } else {
        this.alertBox.openAlert();
      }
    }
  }

  insertDeviceAndRedirect(newDevice) {
    this.deviceService.insertDevice(newDevice).subscribe((device: any) => {
      this.router.navigate(["/record/" + device.id]);
    });
  }

  getNameIdFromArray(name, id): number {
    if (this.checkIfNameExists(name, id)) {
      return this.ids[id][name];
    } else {
      return 0;
    }
  }

  checkIfNameExists(name, id): boolean {
    if (this.ids[id][name] != null) {
      return true;
    }
    return false;
  }

  validateDeviceData(device, idDeviceType): boolean {
    this.newRecords = [];

    if (!this.validateId(device.idRoom)) {
      this.newRecords.push({
        text: "TABLE_HEADERS.DEVICE.ROOM",
        name: this.deviceRoomName,
        type: "deviceRoom",
      });
    }

    if (!this.validateId(device.idModel)) {
      this.newRecords.push({
        text: "TABLE_HEADERS.DEVICE.DEVICE_MODEL",
        name: this.deviceModelName,
        deviceTypeId: idDeviceType,
        deviceTypeName: this.deviceTypeName,
        type: "deviceModel",
      });
    }

    if (!this.validateId(device.idOwner)) {
      this.newRecords.push({
        text: "TABLE_HEADERS.DEVICE.OWNER",
        name: this.deviceOwnerName,
        type: "deviceOwner",
      });
    }

    if (!this.validateId(device.idDeviceSet)) {
      this.newRecords.push({
        text: "TABLE_HEADERS.DEVICE.SET_NUMBER",
        name: this.deviceSetName,
        type: "deviceSet",
      });
    }

    if (device.serialNumber === null || device.serialNumber === "") {
      return false;
    }

    if (this.newRecords.length != 0) {
      return false;
    }

    return true;
  }

  validateId(data): boolean {
    if (data != null && data != "" && data != 0) return true;
    return false;
  }

  insertDeviceType() {
    let modelValue = this.deviceForm.get("deviceModel").value;
    if (this.records["deviceModel"].includes(modelValue)) {
      let type = this.modelsWithTypes[modelValue];
      this.typeInputElement.classList.add("inactive");
      this.typeInputElement.value = type;
      this.deviceTypeInactive = true;
      this.deviceForm.get("deviceType").markAsDirty();
      this.deviceForm.get("deviceType").markAsTouched();
      this.deviceForm.get("deviceType").setValue(type);
    } else {
      this.typeInputElement.classList.remove("inactive");
      this.typeInputElement.value = "";
      this.deviceTypeInactive = false;
    }
  }
}
