import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RoomService } from "../../../../core/services/room.service";
import { SubjectService } from "../../../../core/services/subject.service";
import { Table } from "../table.class";
import { Data } from "../../../../shared/data";
import { GlobalDataValidator } from "app/shared/globalDataValidator";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-room-table",
  templateUrl: "./room-table.component.html",
  styleUrls: ["../table.scss"],
})
export class RoomTableComponent extends Table implements OnInit {
  @ViewChild("name") serialNumberArrow: ElementRef;

  public tableData = [];
  public rooms;
  public roomForm;

  private gdv;
  private currentName;

  constructor(
    subjectService: SubjectService,
    activatedRoute: ActivatedRoute,
    router: Router,
    private roomService: RoomService
  ) {
    super(subjectService, activatedRoute, router, "name", "asc", [
      { name: "EDIT", action: "edit" },
      { name: "DELETE", action: "delete" },
    ]);

    this.gdv = new GlobalDataValidator();
  }

  ngOnInit() {
    this.tableData = Data.getRoomTableData();
    this.initFormGroup();
    this.initialize();
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("name");
    this.currentArrow.classList.add("active");
  }

  initFormGroup() {
    this.roomForm = new FormGroup({
      roomName: new FormControl("", Validators.required),
      roomCount: new FormControl("", Validators.required),
    });
  }

  getAutoCompleteData() {
    this.roomService.getAllRooms().subscribe((data) => {
      this.gdv.insertNames(data, "roomName");
      this.gdv.insertIds(data, "roomName");
    });
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

  validateData() {
    let newRoomName = this.roomForm.get("roomName").value.toLowerCase();

    if (this.roomForm.valid) {
      if (!this.roomExists(newRoomName)) {
        this.updateRecordAndRedirect(newRoomName);
      } else if (this.currentName === newRoomName) {
        this.navigateAfterUpdateRecord();
      }
    }

    this.navigateAfterUpdateRecord();
  }

  roomExists(name) {
    if (this.gdv.names[name]) {
      return true;
    } else {
      return false;
    }
  }

  updateRecordAndRedirect(record) {
    this.roomService.updateRoom(this.editedRecord, record).subscribe(() => {
      this.navigateAfterUpdateRecord();
    });
  }

  updateInputValue() {
    this.roomService.getSingleRoom(this.editedRecord).subscribe((room) => {
      let roomName = room["name"];
      let roomCount = room["count"];

      this.currentName = roomName;

      this.roomForm.controls["roomName"].setValue(roomName);
      this.roomForm.controls["roomCount"].setValue(roomCount);
    });
  }

  checkIfNameExists() {
    let roomName = this.roomForm.get("roomName").value.toLowerCase();
    if (
      this.gdv.names["roomName"].includes(roomName.toLowerCase()) &&
      roomName !== this.currentName
    ) {
      this.roomForm.controls["roomName"].setErrors({ incorrect: true });
    }
  }
}
