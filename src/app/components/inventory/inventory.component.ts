import { Router } from "@angular/router";
import { InventoryService } from "./../../core/services/inventory.service";
import { DeviceService } from "./../../core/services/device.service";
import { Subscription } from "rxjs";
import { RoomService } from "app/core/services/room.service";
import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { OwnerService } from "app/core/services/owner.service";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit {
  @ViewChild("roomInput") roomInput;
  @ViewChild("ownerInput") ownerInput;
  @ViewChild("alertBox") alertBox;
  @ViewChild("popup") popup;
  @ViewChild("attributeSelect") attributeSelect;

  public newRecord = [];
  public valueAccepted = false;
  public rooms = [];
  public owners = [];
  public barcodes = [];
  public devices = [];
  public selectedAttirbute = "room";

  private currentBarcode = "";
  private selectedValue = "";
  private allBarcodes;
  private selectedBarcodes = [];
  private roomServiceSub: Subscription;
  private deviceServiceSub: Subscription;
  private ownerServiceSub: Subscription;

  constructor(
    private roomService: RoomService,
    private deviceService: DeviceService,
    private ownerService: OwnerService,
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAutoCompleteData();
  }

  getAutoCompleteData() {
    this.roomServiceSub = this.roomService.getAllRooms().subscribe((rooms) => {
      for (let room of rooms) {
        if (room.name !== "null") {
          this.rooms.push(room);
        }
      }
    });

    this.ownerServiceSub = this.ownerService
      .getAllOwners()
      .subscribe((owners) => {
        for (let owner of owners) {
          if (owner.name !== "null") {
            this.owners.push(owner);
          }
        }
      });

    this.deviceServiceSub = this.deviceService
      .getAllBarcodes()
      .subscribe((barcodes) => {
        this.allBarcodes = barcodes;
      });
  }

  valueSelectAccept() {
    if (this.selectedAttirbute === "room") {
      this.selectedValue = this.roomInput.nativeElement.value;
      if (this.selectedValue !== null && this.selectedValue !== "") {
        this.valueAccepted = !this.valueAccepted;
        this.devices = [];
        this.roomService
          .getDevicesFromRoom(+this.selectedValue)
          .subscribe((devices: Array<any>) => {
            devices.map((device) => {
              this.selectedBarcodes.push(device.barCode);
              this.devices.push({
                model: device.model,
                inventoryNumber: device.inventoryNumber,
                barcode: device.barCode,
              });
            });
          });
      }
    } else {
      this.selectedValue = this.ownerInput.nativeElement.value;
      if (this.selectedValue !== null && this.selectedValue !== "") {
        this.valueAccepted = !this.valueAccepted;
        this.devices = [];
        this.ownerService
          .getDevicesFromOwner(+this.selectedValue)
          .subscribe((devices: Array<any>) => {
            devices.map((device) => {
              this.selectedBarcodes.push(device.barCode);
              this.devices.push({
                model: device.model,
                inventoryNumber: device.inventoryNumber,
                barcode: device.barCode,
              });
            });
          });
      }
    }
  }

  ngOnDestroy() {
    this.roomServiceSub.unsubscribe();
    this.deviceServiceSub.unsubscribe();
    this.ownerServiceSub.unsubscribe();
  }

  @HostListener("document:keyup", ["$event"])
  clickout(event) {
    if (this.valueAccepted && this.allBarcodes !== undefined) {
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
      tile.classList.add("scanned");
      this.barcodes.push(+barcode);
    } else {
      this.deviceService.getDeviceByBarcode(barcode).subscribe((device) => {
        this.devices.push({
          model: device.model,
          type: device.type,
          barcode: device.barCode,
        });
        setTimeout(() => {
          const tile = document.getElementById(barcode);
          tile.classList.add("additional");
          this.barcodes.push(+barcode);
        }, 200);
      });
    }
  }

  checkIfBarcodeBelongsToRoom(barcode) {
    if (this.selectedBarcodes.indexOf(+barcode) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  removeBarcode(barcode) {
    let index = this.barcodes.indexOf(+barcode);
    this.barcodes.splice(index, 1);
  }

  finish() {
    this.inventoryService
      .insertInventoryItem(
        this.selectedValue,
        this.selectedAttirbute,
        this.barcodes
      )
      .subscribe(() => {
        this.router.navigate(["/inventory/raports"], {
          queryParams: { page: 1 },
        });
      });
  }

  changeAttribute() {
    this.selectedAttirbute = this.attributeSelect.nativeElement.value;
  }
}
