import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceService } from "app/core/services/device.service";
import { Subscription } from "rxjs";
import { PrintableBarcodes } from "../../printableBarcodes";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.scss"],
})
export class PopupComponent implements OnInit {
  @Input() successText;
  @Input() failureText;

  public success = false;

  private closeCurrentAlert;

  constructor(private host: ElementRef, private router: Router) {}

  ngOnInit(): void {
    // this.routeSub = this.activatedRoute.queryParams.subscribe((params) => {
    //   if (params["addBarcode"] !== undefined) {
    //     this.deviceId = params["addBarcode"];
    //   }
    // });
  }

  triggerSuccess() {
    this.success = true;
    this.triggerAlert();
  }

  triggerFailure() {
    this.success = false;
    this.triggerAlert();
  }

  triggerAlert() {
    clearTimeout(this.closeCurrentAlert);
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

  // addBarcode() {
  //   this.deviceService.getSingleDevice(this.deviceId).subscribe((device) => {
  //     this.barcode = device["barCode"];
  //     let model = device["model"]["name"];
  //     let serialNumber = device["serialNumber"];
  //     this.success = PrintableBarcodes.addBarcode(
  //       this.barcode,
  //       serialNumber,
  //       model
  //     );
  //     clearTimeout(this.closeCurrentAlert);
  //     this.triggerAlert();
  //   });
  // }
}
