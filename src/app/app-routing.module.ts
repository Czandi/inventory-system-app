import { TrashRoutingModule } from "./trash/trash-routing.module";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components";

import { DisplayRecordsRoutingModule } from "./display-records/display-records-routing.module";
import { InventoryRoutingModule } from "./inventory/inventory-routing.module";
import { RecordPageRoutingModule } from "./record-page/record-page-routing.module";
import { AddRecordRoutingModule } from "./add-record/add-record-routing.module";
import { UpdateRecordsRoutingModule } from "./update-records/update-records-routing.module";
import { PrintBarcodesRoutingModule } from "./print-barcodes/print-barcodes-routing.module";
import { HistoryRoutingModule } from "./history/history-routing.module";

const routes: Routes = [
  {
    path: "",
    redirectTo: "display-records/device-table?page=1",
    pathMatch: "full",
  },
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
