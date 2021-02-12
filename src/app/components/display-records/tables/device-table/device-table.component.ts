import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceService } from "../../../../core/services/device.service";
import { SubjectService } from "../../../../core/services/subject.service";
import { Table } from "../table.class";
import { Data } from "../../../../shared/data";
import { ModelService } from "app/core/services/model.service";
import { DeviceTypeService } from "app/core/services/device-type.service";
import { RoomService } from "app/core/services/room.service";
import { OwnerService } from "app/core/services/owner.service";
import { DeviceSetService } from "app/core/services/device-set.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DeviceDataValidator } from "../../../../shared/deviceDataValidator";

@Component({
  selector: "app-device-table",
  templateUrl: "./device-table.component.html",
  styleUrls: ["../table.scss", "device-table.component.style.scss"],
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
      {
        name: "ADD_BARCODE_FOR_PRINT",
        action: "addBarcode",
      },
      // { name: "EDIT", action: "edit" },
      { name: "DELETE", action: "delete-product" },
      { name: "DISPLAY", action: "display", table: "device" },
    ]);
    this.deviceDataValidator = new DeviceDataValidator();
  }

  ngOnInit(): void {
    this.tableData = Data.getDeviceTableData();
    this.initFormGroup();
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

  testAsd() {}

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

    this.records = this.deviceDataValidator.names;
  }

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
      this.deviceForm.get("deviceType").setValue("");
    }
  }

  validateData() {
    let newRoomName = this.deviceForm.get("deviceRoom").value.toLowerCase();
    let newOwnerName = this.deviceForm.get("deviceOwner").value.toLowerCase();
    let newSetName = this.deviceForm.get("deviceSet").value.toLowerCase();
    let newModelName = this.deviceForm.get("deviceModel").value.toLowerCase();
    let newTypeName = this.deviceForm.get("deviceType").value.toLowerCase();
    let newSerialNumber = this.deviceForm
      .get("serialNumber")
      .value.toLowerCase();
    let newComment = "";

    let device = this.deviceDataValidator.createNewDevice(
      newSerialNumber,
      newModelName,
      newTypeName,
      newRoomName,
      newOwnerName,
      newSetName,
      newComment
    );
    if (this.deviceForm.valid) {
      if (this.deviceDataValidator.validateDeviceData(device)) {
        this.updateRecordAndRedirect(device);
      } else {
        this.newRecords = this.deviceDataValidator.newRecords;
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
}
