import { Router } from "@angular/router";
import { InventoryService } from "./../core/services/inventory.service";
import { DeviceService } from "./../core/services/device.service";
import { SubjectService } from "app/core/services/subject.service";
import { Subscription } from "rxjs";
import { RoomService } from "app/core/services/room.service";
import { Component, HostListener, OnInit, ViewChild } from "@angular/core";

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
  public rooms = [];
  public barcodes = [];

  private currentBarcode = "";
  private allBarcodes;
  private inventoryId;
  private roomServiceSub: Subscription;
  private deviceServiceSub: any;

  constructor(
    private roomService: RoomService,
    private deviceService: DeviceService,
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAutoCompleteData();
  }

  getAutoCompleteData() {
    this.roomServiceSub = this.roomService.getAllRooms().subscribe((data) => {
      for (let room of data) {
        this.rooms.push(room);
      }
    });

    this.deviceServiceSub = this.deviceService
      .getAllBarcodes()
      .subscribe((barcodes) => {
        this.allBarcodes = barcodes;
        console.log(this.allBarcodes);
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
    this.deviceServiceSub.unsubscribe();
  }

  @HostListener("document:keyup", ["$event"])
  clickout(event) {
    if (this.roomAccepted && this.allBarcodes !== undefined) {
      if (event.key === "Enter") {
        if (this.checkBarcode(this.currentBarcode)) {
          this.addBarcode(this.currentBarcode);
        }
        // console.log(this.allBarcodes[19]);
        // console.log(+this.currentBarcode);
        // if (this.allBarcodes.indexOf(+this.currentBarcode !== -1)) {
        //   console.log("Git");
        // }
        this.currentBarcode = "";
      } else {
        this.currentBarcode += "" + event.key;
      }
    }
  }

  checkBarcode(barcode) {
    if (
      this.allBarcodes.indexOf(+barcode) !== -1 &&
      this.barcodes.indexOf(+barcode) === -1
    ) {
      return true;
    } else {
      return false;
    }
  }

  addBarcode(barcode) {
    this.barcodes.push(+barcode);
  }

  removeBarcode(barcode) {
    console.log(barcode);
    let index = this.barcodes.indexOf(+barcode);
    console.log(this.barcodes);
    console.log(index);
    this.barcodes.splice(index, 1);
    console.log(this.barcodes);
  }

  finish() {
    let room = this.roomInput.nativeElement.value;
    this.inventoryService
      .insertInventoryItem(room, this.barcodes)
      .subscribe((data) => {
        this.inventoryId = data.id;
        console.log(this.inventoryId);
      });

    this.router.navigate(["/inventory/raports"], {
      queryParams: { id: this.inventoryId },
    });
  }
}
