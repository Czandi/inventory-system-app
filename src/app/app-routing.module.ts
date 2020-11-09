import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components";

import { DisplayRecordsRoutingModule } from "./display-records/display-records-routing.module";
import { DashboardRoutingModule } from "./dashboard/dashboard-routing.module";
import { AddRecordRoutingModule } from "./add-record/add-record-routing.module";
import { UpdateRecordsRoutingModule } from "./update-records/update-records-routing.module";
import { PrintBarcodesRoutingModule } from "./print-barcodes/print-barcodes-routing.module";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
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
    DashboardRoutingModule,
    AddRecordRoutingModule,
    UpdateRecordsRoutingModule,
    PrintBarcodesRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
