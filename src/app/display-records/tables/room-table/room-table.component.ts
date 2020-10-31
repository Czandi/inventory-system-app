import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RoomService } from "../../../core/services/room.service";
import { SubjectService } from "../../../core/services/subject.service";
import { Table } from "../table.class";
import { Data } from "../../../shared/data";
import { DeviceSetService } from "app/core/services/device-set.service";
import { DeviceTypeService } from "app/core/services/device-type.service";
import { ModelService } from "app/core/services/model.service";
import { OwnerService } from "app/core/services/owner.service";

@Component({
  selector: "app-room-table",
  templateUrl: "./room-table.component.html",
  styleUrls: ["../table.scss"],
})
export class RoomTableComponent extends Table implements OnInit {
  @ViewChild("name") serialNumberArrow: ElementRef;

  public tableData = [];
  public rooms;

  constructor(
    subjectService: SubjectService,
    activatedRoute: ActivatedRoute,
    roomService: RoomService,
    deviceSetService: DeviceSetService,
    deviceTypeService: DeviceTypeService,
    ownerService: OwnerService,
    modelService: ModelService,
    router: Router
  ) {
    super(
      subjectService,
      activatedRoute,
      roomService,
      ownerService,
      deviceSetService,
      deviceTypeService,
      modelService,
      router,
      "name",
      "asc",
      [
        { name: "EDIT", route: router.url + "/edit" },
        { name: "DELETE", route: router.url + "/delete" },
      ]
    );
  }

  ngOnInit() {
    this.tableData = Data.getRoomTableData();
    this.initialize();
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("name");
    this.currentArrow.classList.add("active");
  }

  getRecords() {
    this.apiSub = this.roomService
      .getAllRoomsWithDevicesCount(
        this.currentPage,
        this.sort.value,
        this.sort.type,
        this.searchValue
      )
      .subscribe((data) => {
        this.rooms = data.content;
        this.subjectService.totalPageNumber.next(data.totalPages);
      });
  }
}
