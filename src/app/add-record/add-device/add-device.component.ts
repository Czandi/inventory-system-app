import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { RoomService } from "../../core/services/room.service";
import { OwnerService } from "../../core/services/owner.service";
import { DeviceSetService } from "../../core/services/device-set.service";
import { DeviceTypeService } from "../../core/services/device-type.service";
import { ModelService } from "../../core/services/model.service";

@Component({
  selector: "app-add-device",
  templateUrl: "./add-device.component.html",
  styleUrls: ["./add-device.component.scss"],
})
export class AddDeviceComponent implements OnInit {
  private deviceSetData;
  private deviceSetOptions = [];
  private deviceTypeData;
  private deviceTypeOptions = [];
  private ownerData;
  private ownerOptions = [];
  private roomData;
  private roomOptions = [];
  private modelData;
  private modelOptions = [];
  private myControl = new FormControl();
  private filteredOptions: Observable<string[]>;

  constructor(
    private roomService: RoomService,
    private ownerService: OwnerService,
    private deviceSetService: DeviceSetService,
    private deviceTypeService: DeviceTypeService,
    private modelService: ModelService
  ) {}

  ngOnInit(): void {
    this.deviceSetService.getAllDeviceSets().subscribe((data) => {
      this.deviceSetData = data;
      this.insertNames(this.deviceSetData, this.deviceSetOptions);
    });
    this.deviceTypeService.getAllDeviceTypes().subscribe((data) => {
      this.deviceTypeData = data;
      this.insertNames(this.deviceTypeData, this.deviceTypeOptions);
    });
    this.ownerService.getAllOwners().subscribe((data) => {
      this.ownerData = data;
      this.insertNames(this.ownerData, this.ownerOptions);
    });
    this.roomService.getAllRooms().subscribe((data) => {
      this.roomData = data;
      this.insertNames(this.roomData, this.roomOptions);
    });
    this.modelService.getAllModels().subscribe((data) => {
      this.modelData = data;
      this.insertNames(this.modelData, this.modelOptions);
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  private insertNames(from, to) {
    for (let name of from) {
      to.push(name["name"]);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.deviceTypeOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
