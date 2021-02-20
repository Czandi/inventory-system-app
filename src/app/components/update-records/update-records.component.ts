import { ModelService } from "./../../core/services/model.service";
import { DeviceDto } from "./../../shared/models/deviceDto.model";
import { Device } from "./../../shared/models/device.model";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { DeviceSetService } from "./../../core/services/device-set.service";
import { OwnerService } from "./../../core/services/owner.service";
import { DeviceService } from "./../../core/services/device.service";
import { RoomService } from "./../../core/services/room.service";
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SubjectService } from "app/core/services/subject.service";

@Component({
  selector: "app-update-records",
  templateUrl: "./update-records.component.html",
  styleUrls: ["./update-records.component.scss"],
})
export class UpdateRecordsComponent implements OnInit, OnDestroy {
  @ViewChild("popup") popup;
  @ViewChild("alertBox") alertBox;

  public accepted = false;
  public buttonType = "disable";
  public rooms = [];
  public owners = [];
  public sets = [];
  public barcodes = [];
  public scannedDevices = [];
  public newRecords = [];
  public form;

  private currentBarcode = "";
  private allBarcodes = [];
  private allDevices: { [key: string]: DeviceDto } = {};
  private allIds: { [key: string]: { [key: string]: number } } = {};

  private roomServiceSub: Subscription;
  private deviceServiceSub: Subscription;
  private ownerServiceSub: Subscription;
  private deviceSetServiceSub: Subscription;
  private modelServiceSub: Subscription;
  private alertSub: Subscription;

  constructor(
    private roomService: RoomService,
    private deviceService: DeviceService,
    private ownerService: OwnerService,
    private deviceSetService: DeviceSetService,
    private modelService: ModelService,
    private subjectService: SubjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAutocompleteData();
    this.initFormGroup();
    this.createAlertClosingListener();
  }

  ngOnDestroy() {
    this.roomServiceSub.unsubscribe();
    this.ownerServiceSub.unsubscribe();
    this.deviceSetServiceSub.unsubscribe();
    this.deviceServiceSub.unsubscribe();
    this.modelServiceSub.unsubscribe();
    this.alertSub.unsubscribe();
  }

  initFormGroup() {
    this.form = new FormGroup({
      room: new FormControl(""),
      owner: new FormControl(""),
      set: new FormControl(""),
    });
  }

  createAlertClosingListener() {
    this.alertSub = this.subjectService.reloadAddRecordPageData.subscribe(
      (newRecords) => {
        this.getAutocompleteData();
      }
    );
  }

  clearTables() {
    this.allIds = {};
    this.rooms = [];
    this.owners = [];
    this.sets = [];
  }

  getAutocompleteData() {
    this.clearTables();

    this.roomServiceSub = this.roomService.getAllRooms().subscribe((data) => {
      this.allIds["rooms"] = {};
      for (let room of data) {
        if (room.name !== "null") {
          this.rooms.push(room.name);
          this.allIds["rooms"][room.name] = room.id;
        }
      }
    });

    this.ownerServiceSub = this.ownerService
      .getAllOwners()
      .subscribe((data) => {
        this.allIds["owners"] = {};
        for (let owner of data) {
          if (owner.name !== "null") {
            this.owners.push(owner.name);
            this.allIds["owners"][owner.name] = owner.id;
          }
        }
      });

    this.deviceSetServiceSub = this.deviceSetService
      .getAllDeviceSets()
      .subscribe((data) => {
        this.allIds["sets"] = {};
        for (let set of data) {
          if (set.name !== "null") {
            this.sets.push(set.name);
            this.allIds["sets"][set.name] = set.id;
          }
        }
      });

    this.modelServiceSub = this.modelService
      .getAllModels()
      .subscribe((data) => {
        this.allIds["models"] = {};
        for (let model of data) {
          this.allIds["models"][model.name] = model.id;
        }
      });

    this.deviceServiceSub = this.deviceService
      .getAllDevices()
      .subscribe((devices) => {
        for (let device of devices) {
          this.allBarcodes.push(device.barCode);
          this.allDevices[device.barCode] = device;
          console.log(this.allBarcodes);
        }
      });
  }

  accept() {
    if (this.buttonType !== "disable") {
      this.scannedDevices = [];
      this.barcodes = [];
      if (!this.accepted) {
        if (!this.checkIfValuesAreNew(this.getInputValues())) {
          this.accepted = !this.accepted;
          this.buttonType = "secondary";
          this.form.get("set").disable();
          this.form.get("owner").disable();
          this.form.get("room").disable();
        }
      } else {
        this.accepted = !this.accepted;
        this.buttonType = "primary";
        this.form.get("set").enable();
        this.form.get("owner").enable();
        this.form.get("room").enable();
      }
    }
  }

  @HostListener("document:keyup", ["$event"])
  clickout(event) {
    if (this.accepted && this.allBarcodes !== undefined) {
      if (event.key === "Enter") {
        if (this.checkIfBarcodeExists(this.currentBarcode)) {
          if (!this.checkIfBarcodeIsAlreadyScanned(this.currentBarcode)) {
            this.addBarcode(this.currentBarcode);
          } else {
            this.popup.triggerSuccess();
          }
        } else {
          this.popup.triggerFailure();
        }
        this.currentBarcode = "";
      } else {
        this.currentBarcode += "" + event.key;
      }
    }
  }

  checkIfBarcodeExists(barcode) {
    if (this.allBarcodes.indexOf(+barcode) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  checkIfBarcodeIsAlreadyScanned(barcode) {
    if (this.barcodes.indexOf(+barcode) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  addBarcode(barcode) {
    this.deviceService.getDeviceByBarcode(barcode).subscribe((device) => {
      this.scannedDevices.push({
        model: device.model,
        type: device.type,
        barcode: device.barCode,
      });
      setTimeout(() => {
        const tile = document.getElementById(barcode);
        tile.classList.add("scanned");
        this.barcodes.push(+barcode);
      }, 0);
    });
  }

  onChange() {
    let inputValues = this.getInputValues();

    if (
      inputValues.room !== "" ||
      inputValues.owner !== "" ||
      inputValues.set !== ""
    ) {
      this.buttonType = "primary";
    } else if (
      inputValues.room === "" &&
      inputValues.owner === "" &&
      inputValues.set === ""
    ) {
      this.buttonType = "disable";
    }
  }

  checkIfValuesAreNew(inputValues) {
    this.newRecords = [];

    if (
      this.rooms.indexOf(inputValues.room) === -1 &&
      inputValues.room !== ""
    ) {
      this.newRecords.push({
        text: "TABLE_HEADERS.DEVICE.ROOM",
        name: inputValues.room,
        type: "deviceRoom",
      });
    }

    if (
      this.owners.indexOf(inputValues.owner) === -1 &&
      inputValues.owner !== ""
    ) {
      this.newRecords.push({
        text: "TABLE_HEADERS.DEVICE.OWNER",
        name: inputValues.owner,
        type: "deviceOwner",
      });
    }

    if (this.sets.indexOf(inputValues.set) === -1 && inputValues.set !== "") {
      this.newRecords.push({
        text: "TABLE_HEADERS.DEVICE.SET_NUMBER",
        name: inputValues.set,
        type: "deviceSet",
      });
    }

    if (this.newRecords.length > 0) {
      this.alertBox.openAlert();
      return true;
    }

    return false;
  }

  getInputValues() {
    let room = this.form.get("room").value.toLowerCase();
    let owner = this.form.get("owner").value.toLowerCase();
    let set = this.form.get("set").value.toLowerCase();

    return {
      room: room,
      owner: owner,
      set: set,
    };
  }

  finish() {
    let newDevices = [];
    let inputValues = this.getInputValues();

    for (let i = 0; i < this.scannedDevices.length; i++) {
      let currentBarcode = this.scannedDevices[i].barcode;

      let newDevice = new Device();
      let oldDevice = this.allDevices[currentBarcode];

      newDevice.id = oldDevice.id;
      newDevice.comment = oldDevice.comments;
      newDevice.idModel = this.allIds["models"][oldDevice.model];
      newDevice.serialNumber = oldDevice.serialNumber;

      let idRoom;
      if (inputValues.room !== "") {
        idRoom = this.allIds["rooms"][inputValues.room];
      } else {
        idRoom = this.allIds["rooms"][oldDevice.room];
      }
      newDevice.idRoom = idRoom;

      let idOwner;
      if (inputValues.owner !== "") {
        idOwner = this.allIds["owners"][inputValues.owner];
      } else {
        idOwner = this.allIds["owners"][oldDevice.owner];
      }
      newDevice.idOwner = idOwner;

      let idSet;
      if (inputValues.set !== "") {
        idSet = this.allIds["sets"][inputValues.set];
      } else {
        idSet = this.allIds["sets"][oldDevice.deviceSet];
      }
      newDevice.idDeviceSet = idSet;

      newDevices.push(newDevice);
    }

    this.updateDevices(newDevices);
  }

  updateDevices(devices) {
    for (let i = 0; i < devices.length; i++) {
      const device = devices[i];
      const id = device.id;

      this.deviceService.updateDevice(id, device).subscribe((data) => {});
    }

    setTimeout(() => {
      this.router.navigate(["/display-records/product-table"], {
        queryParams: { page: 1 },
      });
    }, 500);
  }
}
