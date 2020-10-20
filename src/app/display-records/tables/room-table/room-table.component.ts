import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { RoomService } from "../../../core/services/room.service";
import { SubjectService } from "../../../core/services/subjectService";
import { Table } from "../table.class";
import { TableData } from "../table.data";

@Component({
  selector: "app-room-table",
  templateUrl: "./room-table.component.html",
  styleUrls: ["../table.scss"],
})
export class RoomTableComponent extends Table implements OnInit {
  @Input() currentPage;
  @Input() searchValue;
  @ViewChild("name") serialNumberArrow: ElementRef;

  public tableData = [];
  public rooms;

  constructor(
    subjectService: SubjectService,
    private roomService: RoomService
  ) {
    super(subjectService, "name", "asc", [
      "Option one",
      "Option two",
      "Option three",
    ]);
  }

  ngOnInit() {
    this.tableData = TableData.getRoomTableData();
    this.getRecords();
    this.initialized = true;
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("name");
    this.currentArrow.classList.add("active");
  }

  getRecords() {
    this.apiSub = this.roomService
      .getAllRooms(
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
