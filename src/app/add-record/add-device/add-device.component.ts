import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { map, startWith } from "rxjs/operators";

import { Device } from "../../shared/models/device.model";
import { RoomService } from "../../core/services/room.service";
import { OwnerService } from "../../core/services/owner.service";
import { DeviceSetService } from "../../core/services/device-set.service";
import { DeviceTypeService } from "../../core/services/device-type.service";
import { ModelService } from "../../core/services/model.service";
import { DeviceService } from "app/core/services/device.service";

@Component({
  selector: "app-add-device",
  templateUrl: "./add-device.component.html",
  styleUrls: ["./add-device.component.scss"],
})
export class AddDeviceComponent implements OnInit {
  @ViewChild("serialNumber") serialNumberInput: ElementRef;
  @ViewChild("deviceModel") deviceModelInput: ElementRef;
  @ViewChild("deviceType") deviceTypeInput: ElementRef;
  @ViewChild("room") roomInput: ElementRef;
  @ViewChild("owner") ownerInput: ElementRef;
  @ViewChild("deviceSet") deviceSetInput: ElementRef;
  @ViewChild("comment") commentInput: ElementRef;

  public deviceSetOptions = [];
  public deviceTypeOptions = [];
  public ownerOptions = [];
  public roomOptions = [];
  public modelOptions = [];

  private deviceSetIds = [];
  private deviceTypeIds = [];
  private ownerIds = [];
  private roomIds = [];
  private modelIds = [];

  constructor(
    private roomService: RoomService,
    private ownerService: OwnerService,
    private deviceSetService: DeviceSetService,
    private deviceTypeService: DeviceTypeService,
    private modelService: ModelService,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.deviceSetService.getAllDeviceSets().subscribe((data) => {
      this.insertNames(data, this.deviceSetOptions);
      this.createIndexSignatureArray(data, this.deviceSetIds);
    });
    this.deviceTypeService.getAllDeviceTypes().subscribe((data) => {
      this.insertNames(data, this.deviceTypeOptions);
      this.createIndexSignatureArray(data, this.deviceTypeIds);
    });
    this.ownerService.getAllOwners().subscribe((data) => {
      this.insertNames(data, this.ownerOptions);
      this.createIndexSignatureArray(data, this.ownerIds);
      console.log(this.ownerIds);
    });
    this.roomService.getAllRooms().subscribe((data) => {
      this.insertNames(data, this.roomOptions);
      this.createIndexSignatureArray(data, this.roomIds);
    });
    this.modelService.getAllModels().subscribe((data) => {
      this.insertNames(data, this.modelOptions);
      this.createIndexSignatureArray(data, this.modelIds);
    });
  }

  private createIndexSignatureArray(from, to) {
    for (let item of from) {
      let s: string = item["name"];
      to[s.toLowerCase()] = item["id"];
    }
  }

  private insertNames(from, to) {
    for (let name of from) {
      let s: string = name["name"];
      to.push(s.toLowerCase());
    }
  }

  addDevice() {
    let roomName: string = this.roomInput.nativeElement.value;
    let idRoom: number = this.getNameIdFromArray(roomName, this.roomIds);
    let modelName: string = this.deviceModelInput.nativeElement.value;
    let idModel: number = this.getNameIdFromArray(modelName, this.modelIds);
    let ownerName: string = this.ownerInput.nativeElement.value;
    let idOwner: number = this.getNameIdFromArray(ownerName, this.ownerIds);
    let deviceSetName: string = this.deviceSetInput.nativeElement.value;
    let idDeviceSet: number = this.getNameIdFromArray(
      deviceSetName,
      this.deviceSetIds
    );
    let serialNumber = this.serialNumberInput.nativeElement.value;
    let comment = this.commentInput.nativeElement.value;
    console.log(comment);

    let device = new Device();
    device.serialNumber = serialNumber;
    device.idModel = idModel;
    device.idRoom = idRoom;
    device.idOwner = idOwner;
    device.idDeviceSet = idDeviceSet;
    device.comment = comment;

    this.deviceService
      .insertDevice(device)
      .subscribe((device) => console.log(device));
  }

  getNameIdFromArray(name, array): number {
    if (this.checkIfNameExists(name, array)) {
      return array[name];
    } else {
      return 0;
    }
  }

  checkIfNameExists(name, table): boolean {
    if (table[name] != null) {
      return true;
    }
    return false;
  }
}
