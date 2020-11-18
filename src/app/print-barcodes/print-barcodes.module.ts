import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PrintBarcodesComponent } from "./print-barcodes.component";

import { PrintBarcodesRoutingModule } from "./print-barcodes-routing.module";
import { SharedModule } from "../shared/shared.module";

import { NgxBarcodeModule } from "ngx-barcode";

@NgModule({
  declarations: [PrintBarcodesComponent],
  imports: [
    CommonModule,
    SharedModule,
    PrintBarcodesRoutingModule,
    NgxBarcodeModule,
  ],
})
export class PrintBarcodesModule {}
