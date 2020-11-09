import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { PrintBarcodesComponent } from "./print-barcodes.component";

const routes: Routes = [
  {
    path: "print-barcodes",
    component: PrintBarcodesComponent,
    data: { animation: "PrintBarcodes" },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintBarcodesRoutingModule {}
