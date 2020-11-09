import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PrintBarcodesComponent } from "./print-barcodes.component";

import { PrintBarcodesRoutingModule } from "./print-barcodes-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [PrintBarcodesComponent],
  imports: [CommonModule, SharedModule, PrintBarcodesRoutingModule],
})
export class PrintBarcodesModule {}
