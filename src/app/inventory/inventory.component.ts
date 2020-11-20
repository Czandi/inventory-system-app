import { SubjectService } from "app/core/services/subject.service";
import { Subscription } from "rxjs";
import { RoomService } from "app/core/services/room.service";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit {
  @ViewChild("roomInput") roomInput;
  @ViewChild("alertBox") alertBox;

  public newRecord = [];
  public roomAccepted = false;
  public roomNames = [];

  private roomIds = [];
  private roomServiceSub: Subscription;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.getAutoCompleteData();
  }

  getAutoCompleteData() {
    this.roomServiceSub = this.roomService.getAllRooms().subscribe((data) => {
      for (let room of data) {
        this.roomNames.push(room.name);
        this.roomIds[(room.id, name)] = room.id;
      }
    });
  }

  roomSelectSwitcher() {
    let value = this.roomInput.nativeElement.value;
    if (value !== null && value !== "") {
      this.roomAccepted = !this.roomAccepted;
    }
  }

  ngOnDestroy() {
    this.roomServiceSub.unsubscribe();
  }
}
