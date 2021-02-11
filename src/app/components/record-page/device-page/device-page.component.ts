import { SubjectService } from "app/core/services/subject.service";
import { Subscription } from "rxjs";
import { DeviceDataValidator } from "./../../../shared/deviceDataValidator";
import { DateService } from "./../../../core/services/date.service";
import { HistoryService } from "./../../../core/services/history.service";
import { FormControl, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { DeviceService } from "./../../../core/services/device.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { DeviceSetService } from "app/core/services/device-set.service";
import { DeviceTypeService } from "app/core/services/device-type.service";
import { ModelService } from "app/core/services/model.service";
import { OwnerService } from "app/core/services/owner.service";
import { RoomService } from "app/core/services/room.service";

@Component({
  selector: "app-device-page",
  templateUrl: "./device-page.component.html",
  styleUrls: ["./device-page.component.scss", "../record-page.component.scss"],
})
export class DevicePageComponent implements OnInit {
  @ViewChild("deviceType") typeInputElement: ElementRef;
  @ViewChild("alertBox") alertBox;

  public newRecords = [];
  public device;
  public deviceForm;
  public deviceHistory;
  public buttonType = "disable";
  public autocompleteRecords;
  public deviceTypeInactive = true;
  public currentPage = 1;
  public totalPages = 2;

  private deviceArray = [];
  private deviceDataValidator;
  private editedRecord = null;
  private alertSub: Subscription;
  private routeSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService,
    private historyService: HistoryService,
    private modelService: ModelService,
    private deviceTypeService: DeviceTypeService,
    private roomService: RoomService,
    private ownerService: OwnerService,
    private deviceSetService: DeviceSetService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.initFormGroup();

    this.alertSub = this.subjectService.reloadAddRecordPageData.subscribe(
      (newRecords) => {
        if (newRecords.indexOf("deviceModel") != -1) {
          setTimeout(() => {
            this.insertDeviceType();
          }, 500);
        }
        this.getAutoCompleteData();
      }
    );

    this.activatedRoute.queryParams
      .subscribe((params) => {
        if (params["id"] !== undefined) {
          this.editedRecord = params["id"];
          this.deviceService
            .getSingleDevice(+params["id"])
            .subscribe((device) => {
              this.device = device;
              this.getDeviceHistory();
              this.insertInputValue(device);
              this.mapDeviceToArray();
            });
        }
      })
      .unsubscribe();

    this.routeSub = this.activatedRoute.queryParams.subscribe((params) => {
      if (
        params["page"] !== undefined &&
        params["page"] !== this.currentPage &&
        this.device !== undefined
      ) {
        this.currentPage = params["page"];
        console.log("test");
        this.getDeviceHistory();
      }
    });

    this.deviceDataValidator = new DeviceDataValidator();
    this.getAutoCompleteData();
  }

  ngAfterViewInit() {
    // this.routeSub = this.activatedRoute.queryParams.subscribe((params) => {
    //   console.log(params);
    //   if (params["page"] !== undefined) {
    //     console.log("test");
    //     this.currentPage = params["page"];
    //     this.getDeviceHistory();
    //   }
    // if (params["id"] !== undefined) {
    //   this.editedRecord = params["id"];
    //   this.deviceService
    //     .getSingleDevice(+params["id"])
    //     .subscribe((device) => {
    //       this.device = device;
    //       this.getDeviceHistory();
    //       this.insertInputValue(device);
    //       this.mapDeviceToArray();
    //     });
    // }
    // });
  }

  ngOnDestroy() {
    this.alertSub.unsubscribe();
  }

  getDeviceHistory() {
    this.historyService
      .getSingleDeviceHistory(this.currentPage, this.device.id)
      .subscribe((history) => {
        this.deviceHistory = history.content;
        this.totalPages = history.totalPages;
        console.log(this.totalPages);
      });
  }

  initFormGroup() {
    this.deviceForm = new FormGroup({
      serialNumber: new FormControl(""),
      deviceModel: new FormControl("", Validators.required),
      deviceBarCode: new FormControl("", Validators.required),
      deviceType: new FormControl("", Validators.required),
      deviceRoom: new FormControl("", Validators.required),
      deviceOwner: new FormControl("", Validators.required),
      deviceSet: new FormControl("", Validators.required),
      deviceComment: new FormControl(""),
    });

    this.deviceForm.controls["deviceBarCode"].disable();
    this.deviceForm.controls["deviceType"].disable();
  }

  insertInputValue(device) {
    let serialNumber = device.serialNumber;
    let modelName = device.model.name;
    let typeName = device.model.type.name;
    let roomName = device.room.name;
    let ownerName = device.owner.name;
    let barCode = device.barCode;
    let setName = device.productSet.name;
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
    this.deviceArray["deviceSet"] = this.device.productSet.name;
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
      this.deviceForm.controls["deviceSet"].value !==
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
        this.deviceArray["deviceComment"]
    ) {
      this.buttonType = "secondary";
    } else {
      this.buttonType = "disable";
    }
  }

  insertDeviceType() {
    let modelValue = this.deviceForm.get("deviceModel").value;
    console.log(this.deviceDataValidator.names["deviceModel"]);
    console.log(modelValue);
    if (this.deviceDataValidator.names["deviceModel"].includes(modelValue)) {
      let type = this.deviceDataValidator.modelsWithTypes[modelValue];
      this.typeInputElement.nativeElement.classList.add("inactive");
      this.typeInputElement.nativeElement.value = type;
      this.deviceTypeInactive = true;
      this.deviceForm.get("deviceType").markAsDirty();
      this.deviceForm.get("deviceType").markAsTouched();
      this.deviceForm.get("deviceType").setValue(type);
      this.deviceForm.controls["deviceType"].disable();
    } else {
      this.typeInputElement.nativeElement.classList.remove("inactive");
      this.deviceForm.controls["deviceType"].enable();
      this.typeInputElement.nativeElement.value = "";
      this.deviceTypeInactive = false;
      this.deviceForm.get("deviceType").setValue("");
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

      case "serial_number":
        attribute += "SERIAL_NUMBER";
        break;

      default:
        attribute = name;
    }

    return attribute;
  }

  updateDevice() {
    if (this.buttonType !== "disable") {
      let newRoom = this.deviceForm.get("deviceRoom").value.toLowerCase();
      let newModel = this.deviceForm.get("deviceModel").value.toLowerCase();
      let newSerialNumber = this.deviceForm
        .get("serialNumber")
        .value.toLowerCase();
      let newType = this.deviceForm.get("deviceType").value.toLowerCase();
      let newOnwer = this.deviceForm.get("deviceOwner").value.toLowerCase();
      let newSet = this.deviceForm.get("deviceSet").value.toLowerCase();
      let newComment = this.deviceForm.get("deviceComment").value.toLowerCase();

      let device = this.deviceDataValidator.createNewDevice(
        newSerialNumber,
        newModel,
        newType,
        newRoom,
        newOnwer,
        newSet,
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
  }

  updateRecordAndRedirect(record) {
    this.deviceService
      .updateDevice(this.editedRecord, record)
      .subscribe((device) => {
        this.device = device;
        this.getDeviceHistory();
        this.buttonType = "disable";
        this.deviceForm.controls["deviceType"].disable();
        this.navigateAfterUpdateRecord();
      });
  }

  navigateAfterUpdateRecord() {
    // this.getAutoCompleteData();
    // this.getRecords();
    // this.router.navigate([], {
    //   queryParams: { edit: null },
    //   queryParamsHandling: "merge",
    // });
  }
}
