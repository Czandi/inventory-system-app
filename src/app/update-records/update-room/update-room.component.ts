import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { RoomService } from "app/core/services/room.service";
import { SubjectService } from "app/core/services/subject.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-update-room",
  templateUrl: "./update-room.component.html",
  styleUrls: [
    "./update-room.component.scss",
    "../update-records.component.scss",
  ],
})
export class UpdateRoomComponent implements OnInit, OnDestroy {
  @ViewChild("roomInput") roomInput;
  @ViewChild("alertBox") alertBox;

  public newRecord = [];
  public roomAccepted = false;
  public roomNames = [];

  private roomIds = [];
  private alertSub: Subscription;
  private roomServiceSub: Subscription;

  constructor(
    private roomService: RoomService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.getAutoCompleteData();
    this.createAlertClosingListener();
  }

  getAutoCompleteData() {
    this.roomServiceSub = this.roomService.getAllRooms().subscribe((data) => {
      for (let room of data) {
        this.roomNames.push(room.name);
        this.roomIds[(room.id, name)] = room.id;
      }
    });
  }

  ngOnDestroy() {
    this.alertSub.unsubscribe();
    this.roomServiceSub.unsubscribe();
  }

  roomSelectSwitcher() {
    let value = this.roomInput.nativeElement.value;
    if (value === null || value === "") {
      this.roomInput.nativeElement.classList.add("invalid");
    } else if (this.roomNames.includes(value)) {
      this.roomInput.nativeElement.classList.remove("invalid");
      this.roomAccepted = !this.roomAccepted;
    } else {
      this.roomInput.nativeElement.classList.remove("invalid");
      this.newRecord = [];
      this.newRecord.push({
        text: "TABLE_HEADERS.DEVICE.ROOM",
        name: value,
        type: "deviceRoom",
      });
      this.alertBox.openAlert();
    }
  }

  checkName() {
    let value = this.roomInput.nativeElement.value;
    if (value !== null || value !== "") {
      this.roomInput.nativeElement.classList.remove("invalid");
    }
  }

  createAlertClosingListener() {
    this.alertSub = this.subjectService.reloadAddRecordPageData.subscribe(
      () => {
        this.getAutoCompleteData();
      }
    );
  }

  update() {}
}
