import { Component, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceService } from "app/core/services/device.service";
import { Subscription } from "rxjs";
import { PrintableBarcodes } from "../../shared/printableBarcodes";

@Component({
  selector: "app-add-barcode-alert",
  templateUrl: "./add-barcode-alert.component.html",
  styleUrls: ["./add-barcode-alert.component.scss"],
})
export class AddBarcodeAlertComponent implements OnInit {
  public successful = false;

  private deviceId;
  private barcode;

  private closeCurrentAlert;
  private routeSub: Subscription;

  constructor(
    private host: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.queryParams.subscribe((params) => {
      if (params["addBarcode"] !== undefined) {
        this.deviceId = params["addBarcode"];
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  triggerAlert() {
    this.host.nativeElement.classList.add("active");
    this.closeCurrentAlert = setTimeout(() => {
      this.closeAlert();
    }, 2000);
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
      let model = device["model"]["name"];
      let serialNumber = device["serialNumber"];
      this.successful = PrintableBarcodes.addBarcode(
        this.barcode,
        serialNumber,
        model
      );
      clearTimeout(this.closeCurrentAlert);
      this.triggerAlert();
    });
  }
}
