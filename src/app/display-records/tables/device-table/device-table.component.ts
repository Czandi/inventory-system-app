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

@Component({
  selector: "app-device-table",
  templateUrl: "./device-table.component.html",
  styleUrls: ["../table.scss"],
})
export class DeviceTableComponent extends Table implements OnInit {
  @ViewChild("serialNumber") serialNumberArrow: ElementRef;

  public tableData = [];
  public devices;
  public records: any = {};
  public deviceForm;

  private ids: any = {};
  private modelsWithTypes = [];
  private deviceSetSub;
  private deviceTypeSub;
  private deviceOwnerSub;
  private deviceRoomSub;
  private deviceModelSub;

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
  }

  ngOnInit(): void {
    this.tableData = Data.getDeviceTableData();
    this.initialize();
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("serialNumber");
    this.currentArrow.classList.add("active");
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
    console.log("Get autocomlete data!");
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

    console.log(this.ids);
    console.log(this.records);
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

  private insertModelsWithTypes(data) {
    for (let record of data) {
      this.modelsWithTypes[record.name] = record.type.name;
    }
  }

  ngOnDestroy(): void {
    if (this.deviceSetSub !== undefined) {
      this.deviceSetSub.unsubscribe();
    }

    if (this.deviceTypeSub !== undefined) {
      this.deviceTypeSub.unsubscribe();
    }

    if (this.deviceOwnerSub !== undefined) {
      this.deviceOwnerSub.unsubscribe();
    }

    if (this.deviceOwnerSub !== undefined) {
      this.deviceRoomSub.unsubscribe();
    }

    if (this.deviceModelSub !== undefined) {
      this.deviceModelSub.unsubscribe();
    }

    if (this.apiSub !== undefined) {
      this.apiSub.unsubscribe();
    }
  }

  insertDeviceType() {}

  updateRecord() {
    this.navigateAfterUpdateRecord();
  }
}
