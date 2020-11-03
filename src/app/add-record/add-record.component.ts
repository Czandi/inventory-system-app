import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { RoomService } from "../core/services/room.service";
import { OwnerService } from "../core/services/owner.service";
import { DeviceSetService } from "../core/services/device-set.service";
import { DeviceTypeService } from "../core/services/device-type.service";
import { ModelService } from "../core/services/model.service";
import { DeviceService } from "../core/services/device.service";
import { SubjectService } from "../core/services/subject.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Data } from "../shared/data";
import { Router } from "@angular/router";
import { DeviceDataValidator } from "../shared/deviceDataValidator";

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

  private typeInputElement;

  private alertSub;
  private deviceDataValidator;

  constructor(
    private roomService: RoomService,
    private ownerService: OwnerService,
    private deviceSetService: DeviceSetService,
    private deviceTypeService: DeviceTypeService,
    private modelService: ModelService,
    private deviceService: DeviceService,
    private subjectService: SubjectService,
    private router: Router
  ) {
    this.deviceDataValidator = new DeviceDataValidator();
  }

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

  getAutocompleteData() {
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

  addDevice() {
    let newRoomName = this.deviceForm.get("deviceRoom").value;
    let newOwnerName = this.deviceForm.get("deviceOwner").value;
    let newSetName = this.deviceForm.get("deviceSet").value;
    let newModelName = this.deviceForm.get("deviceModel").value;
    let newTypeName = this.deviceForm.get("deviceType").value;
    let newSerialNumber = this.deviceForm.get("serialNumber").value;
    let newComment = this.deviceForm.get("deviceComment").value;

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
        this.insertDeviceAndRedirect(device);
      } else {
        this.newRecords = this.deviceDataValidator.newRecords;
        this.alertBox.openAlert();
      }
    }
  }

  insertDeviceAndRedirect(newDevice) {
    this.deviceService.insertDevice(newDevice).subscribe((device: any) => {
      this.router.navigate(["/record/" + device.id]);
    });
  }

  insertDeviceType() {
    let modelValue = this.deviceForm.get("deviceModel").value;
    if (this.deviceDataValidator.names["deviceModel"].includes(modelValue)) {
      let type = this.deviceDataValidator.modelsWithTypes[modelValue];
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
      this.deviceForm.get("deviceType").setValue("");
    }
  }
}
