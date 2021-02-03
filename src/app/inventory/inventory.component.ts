import { Router } from "@angular/router";
import { InventoryService } from "./../core/services/inventory.service";
import { DeviceService } from "./../core/services/device.service";
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
  @ViewChild("popup") popup;

  public newRecord = [];
  public roomAccepted = false;
  public rooms = [];
  public barcodes = [];
  public roomDevices = [];

  private currentBarcode = "";
  private allBarcodes;
  private roomBarcodes = [];
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
        if (room.name !== "null") {
          this.rooms.push(room);
        }
      }
    });

    this.deviceServiceSub = this.deviceService
      .getAllBarcodes()
      .subscribe((barcodes) => {
        this.allBarcodes = barcodes;
        console.log(barcodes);
      });
  }

  roomSelectSwitcher() {
    let value = this.roomInput.nativeElement.value;
    if (value !== null && value !== "") {
      this.roomAccepted = !this.roomAccepted;
      this.roomDevices = [];
      this.roomService
        .getDevicesFromRoom(value)
        .subscribe((devices: Array<any>) => {
          devices.map((device) => {
            this.roomBarcodes.push(device.barCode);
            this.roomDevices.push({
              model: device.model,
              type: device.type,
              barcode: device.barCode,
            });
          });
        });
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
        if (this.checkIfBarcodeExists(this.currentBarcode)) {
          if (!this.checkIfBarcodeIsAlreadyScanned(this.currentBarcode)) {
            this.addBarcode(this.currentBarcode);
          } else {
            this.popup.triggerSuccess();
          }
        } else {
          this.popup.triggerFailure();
        }
        this.currentBarcode = "";
      } else {
        this.currentBarcode += "" + event.key;
      }
    }
  }

  checkIfBarcodeExists(barcode) {
    if (this.allBarcodes.indexOf(+barcode) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  checkIfBarcodeIsAlreadyScanned(barcode) {
    if (this.barcodes.indexOf(+barcode) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  addBarcode(barcode) {
    if (this.checkIfBarcodeBelongsToRoom(barcode)) {
      const tile = document.getElementById(barcode);
      console.log(tile);
      tile.classList.add("scanned");
      this.barcodes.push(+barcode);
    } else {
      this.deviceService.getDeviceByBarcode(barcode).subscribe((device) => {
        this.roomDevices.push({
          model: device.model,
          type: device.type,
          barcode: device.barCode,
        });
        setTimeout(() => {
          const tile = document.getElementById(barcode);
          console.log(tile);
          tile.classList.add("additional");
          this.barcodes.push(+barcode);
        }, 200);
      });
    }
  }

  checkIfBarcodeBelongsToRoom(barcode) {
    if (this.roomBarcodes.indexOf(+barcode) !== -1) {
      return true;
    } else {
      return false;
    }
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
