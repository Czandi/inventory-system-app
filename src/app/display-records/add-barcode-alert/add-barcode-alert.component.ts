import { Component, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceService } from "app/core/services/device.service";
import { PrintableBarcodes } from "../../shared/printableBarcodes";

@Component({
  selector: "app-add-barcode-alert",
  templateUrl: "./add-barcode-alert.component.html",
  styleUrls: ["./add-barcode-alert.component.scss"],
})
export class AddBarcodeAlertComponent implements OnInit {
  private deviceId;
  private barcode;

  constructor(
    private host: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params["addBarcode"] !== undefined) {
        this.deviceId = params["addBarcode"];
      }
    });
  }

  openAlert() {
    this.host.nativeElement.classList.add("active");
  }

  closeAlert() {
    this.router.navigate([], {
      queryParams: { addBarcode: null },
      queryParamsHandling: "merge",
    });
    this.host.nativeElement.classList.remove("active");
  }

  addBarcode() {
    this.deviceService.getSingleDevice(this.deviceId).subscribe((device) => {
      this.barcode = device["barCode"];
      PrintableBarcodes.addBarcode(this.barcode);
    });

    this.openAlert();
  }
}
