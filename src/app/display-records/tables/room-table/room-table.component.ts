import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RoomService } from "../../../core/services/room.service";
import { SubjectService } from "../../../core/services/subject.service";
import { Table } from "../table.class";
import { Data } from "../../../shared/data";

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
    route: ActivatedRoute,
    private roomService: RoomService
  ) {
    super(subjectService, route, "name", "asc", [
      "Option one",
      "Option two",
      "Option three",
    ]);
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
