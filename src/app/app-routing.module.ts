import { TrashRoutingModule } from "./components/trash/trash-routing.module";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components";

import { DisplayRecordsRoutingModule } from "./components/display-records/display-records-routing.module";
import { InventoryRoutingModule } from "./components/inventory/inventory-routing.module";
import { RecordPageRoutingModule } from "./components/record-page/record-page-routing.module";
import { AddRecordRoutingModule } from "./components/add-record/add-record-routing.module";
import { UpdateRecordsRoutingModule } from "./components/update-records/update-records-routing.module";
import { PrintBarcodesRoutingModule } from "./components/print-barcodes/print-barcodes-routing.module";
import { HistoryRoutingModule } from "./components/history/history-routing.module";
import { DisplayRecordsModule } from "./components/display-records/display-records.module";

const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "display-records/product-table",
  //   pathMatch: "full",
  // },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DisplayRecordsRoutingModule,
    AddRecordRoutingModule,
    UpdateRecordsRoutingModule,
    PrintBarcodesRoutingModule,
    HistoryRoutingModule,
    RecordPageRoutingModule,
    InventoryRoutingModule,
    TrashRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
