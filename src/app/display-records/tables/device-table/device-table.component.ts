import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceService } from "../../../core/services/device.service";
import { SubjectService } from "../../../core/services/subject.service";
import { Table } from "../table.class";
import { Data } from "../../../shared/data";
import { ModelService } from "app/core/services/model.service";
import { DeviceTypeService } from "app/core/services/device-type.service";
import { RoomService } from "app/core/services/room.service";
import { OwnerService } from "app/core/services/owner.service";
import { DeviceSetService } from "app/core/services/device-set.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Device } from "app/shared/models/device.model";
import { DeviceDataValidator } from "../../../shared/deviceDataValidator";

@Component({
  selector: "app-device-table",
  templateUrl: "./device-table.component.html",
  styleUrls: ["../table.scss"],
})
export class DeviceTableComponent extends Table implements OnInit {
  @ViewChild("serialNumber") serialNumberArrow: ElementRef;
  @ViewChild("deviceType") typeInputElement: ElementRef;
  @ViewChild("alertBox") alertBox;

  public newRecords = [];
  public tableData = [];
  public devices;
  public records: any = {};
  public deviceForm;
  public deviceTypeInactive = true;

  private ids: any = {};
  private modelsWithTypes = [];

  private newRoomName;
  private newOwnerName;
  private newSetName;
  private newModelName;
  private newTypeName;
  private alertSub;
  private deviceDataValidator;

  constructor(
    subjectService: SubjectService,
    activatedRoute: ActivatedRoute,
    router: Router,
    private deviceService: DeviceService,
    private modelService: ModelService,
    private deviceTypeService: DeviceTypeService,
    private roomService: RoomService,
    private ownerService: OwnerService,
    private deviceSetService: DeviceSetService
  ) {
    super(subjectService, activatedRoute, router, "serialNumber", "asc", [
      { name: "EDIT", route: router.url + "/edit" },
      { name: "DELETE", route: router.url + "/delete" },
    ]);
    this.deviceDataValidator = new DeviceDataValidator();
  }

  ngOnInit(): void {
    this.tableData = Data.getDeviceTableData();
    this.initFormGroup();
    this.createAlertClosingListener();
    this.initialize();
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("serialNumber");
    this.currentArrow.classList.add("active");
  }

  initFormGroup() {
    this.deviceForm = new FormGroup({
      serialNumber: new FormControl("", Validators.required),
      deviceModel: new FormControl("", Validators.required),
      deviceType: new FormControl("", Validators.required),
      deviceRoom: new FormControl("", Validators.required),
      deviceOwner: new FormControl("", Validators.required),
      deviceSet: new FormControl("", Validators.required),
      deviceBarCode: new FormControl("", Validators.required),
    });
  }

  getRecords() {
    this.apiSub = this.deviceService
      .getAllDevices(
        +this.currentPage,
        this.sort.value,
        this.sort.type,
        this.searchValue
      )
      .subscribe((data) => {
        this.devices = data.content;
        this.subjectService.totalPageNumber.next(data.totalPages);
      });
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

    this.ids = this.deviceDataValidator.idsTable;
    this.records = this.deviceDataValidator.namesTable;
    this.modelsWithTypes = this.deviceDataValidator.modelsWithTypesTable;
  }

  // private insertIds(data, id) {
  //   this.ids[id] = [];
  //   for (let item of data) {
  //     let itemName = item["name"];
  //     let itemId = item["id"];
  //     this.ids[id][itemName] = itemId;
  //   }
  // }

  // private insertNames(data, id) {
  //   this.records[id] = [];
  //   for (let name of data) {
  //     let itemId = name["name"];
  //     this.records[id].push(itemId);
  //   }
  // }

  // private insertModelsWithTypes(data) {
  //   for (let record of data) {
  //     this.modelsWithTypes[record.name] = record.type.name;
  //   }
  // }

  // ngOnDestroy(): void {
  //   if (this.deviceSetSub !== undefined) {
  //     this.deviceSetSub.unsubscribe();
  //   }

  //   if (this.deviceTypeSub !== undefined) {
  //     this.deviceTypeSub.unsubscribe();
  //   }

  //   if (this.deviceOwnerSub !== undefined) {
  //     this.deviceOwnerSub.unsubscribe();
  //   }

  //   if (this.deviceOwnerSub !== undefined) {
  //     this.deviceRoomSub.unsubscribe();
  //   }

  //   if (this.deviceModelSub !== undefined) {
  //     this.deviceModelSub.unsubscribe();
  //   }

  //   if (this.apiSub !== undefined) {
  //     this.apiSub.unsubscribe();
  //   }
  // }

  insertDeviceType() {
    let modelValue = this.deviceForm.get("deviceModel").value;
    if (this.deviceDataValidator.names["deviceModel"].includes(modelValue)) {
      let type = this.deviceDataValidator.modelsWithTypes[modelValue];
      this.typeInputElement.nativeElement.classList.add("inactive");
      this.typeInputElement.nativeElement.value = type;
      this.deviceTypeInactive = true;
      this.deviceForm.get("deviceType").markAsDirty();
      this.deviceForm.get("deviceType").markAsTouched();
      this.deviceForm.get("deviceType").setValue(type);
    } else {
      this.typeInputElement.nativeElement.classList.remove("inactive");
      this.typeInputElement.nativeElement.value = "";
      this.deviceTypeInactive = false;
    }
  }

  validateData() {
    this.newRoomName = this.deviceForm.get("deviceRoom").value;
    let idRoom = this.getNameIdFromArray(this.newRoomName, "deviceRoom");

    this.newOwnerName = this.deviceForm.get("deviceOwner").value;
    let idOwner = this.getNameIdFromArray(this.newOwnerName, "deviceOwner");

    this.newSetName = this.deviceForm.get("deviceSet").value;
    let idDeviceSet = this.getNameIdFromArray(this.newSetName, "deviceSet");

    this.newModelName = this.deviceForm.get("deviceModel").value;
    let idDeviceModel = this.getNameIdFromArray(
      this.newModelName,
      "deviceModel"
    );

    this.newTypeName = this.deviceForm.get("deviceType").value;
    let idDeviceType = this.getNameIdFromArray(this.newTypeName, "deviceType");

    let serialNumber = this.deviceForm.get("serialNumber").value;
    let comment = "";

    let device = new Device();
    device.serialNumber = serialNumber.toLowerCase();
    device.idModel = idDeviceModel;
    device.idRoom = idRoom;
    device.idOwner = idOwner;
    device.idDeviceSet = idDeviceSet;
    device.comment = comment.toLowerCase();
    if (this.deviceForm.valid) {
      if (this.validateDeviceData(device, idDeviceType)) {
        this.updateRecordAndRedirect(device);
      } else {
        this.alertBox.openAlert();
      }
    }
  }

  updateRecordAndRedirect(record) {
    this.deviceService.updateDevice(this.editedRecord, record).subscribe(() => {
      this.navigateAfterUpdateRecord();
    });
  }

  updateInputValue() {
    this.deviceService
      .getSingleDevice(this.editedRecord)
      .subscribe((device) => {
        let serialNumber = device["serialNumber"];
        let modelName = device["model"].name;
        let typeName = device["model"].type.name;
        let roomName = device["room"].name;
        let ownerName = device["owner"].name;
        let barCode = device["barCode"];
        let setName = device["deviceSet"].name;

        this.deviceForm.controls["serialNumber"].setValue(serialNumber);
        this.deviceForm.controls["deviceModel"].setValue(modelName);
        this.deviceForm.controls["deviceType"].setValue(typeName);
        this.deviceForm.controls["deviceRoom"].setValue(roomName);
        this.deviceForm.controls["deviceOwner"].setValue(ownerName);
        this.deviceForm.controls["deviceBarCode"].setValue(barCode);
        this.deviceForm.controls["deviceSet"].setValue(setName);
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
        name: this.newRoomName,
        type: "deviceRoom",
      });
    }

    if (!this.validateId(device.idModel)) {
      this.newRecords.push({
        text: "TABLE_HEADERS.DEVICE.DEVICE_MODEL",
        name: this.newModelName,
        deviceTypeId: idDeviceType,
        deviceTypeName: this.newTypeName,
        type: "deviceModel",
      });
    }

    if (!this.validateId(device.idOwner)) {
      this.newRecords.push({
        text: "TABLE_HEADERS.DEVICE.OWNER",
        name: this.newOwnerName,
        type: "deviceOwner",
      });
    }

    if (!this.validateId(device.idDeviceSet)) {
      this.newRecords.push({
        text: "TABLE_HEADERS.DEVICE.SET_NUMBER",
        name: this.newSetName,
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

  createAlertClosingListener() {
    this.alertSub = this.subjectService.reloadAddRecordPageData.subscribe(
      (newRecords) => {
        this.getAutoCompleteData();
        if (newRecords.indexOf("deviceModel") != -1) {
          setTimeout(() => {
            this.insertDeviceType();
          }, 500);
        }
      }
    );
  }
}
