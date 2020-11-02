import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DisplayRecordsComponent } from "./display-records.component";

import { DisplayRecordsRoutingModule } from "./display-records-routing.module";
import { SharedModule } from "../shared/shared.module";
import { TableModule } from "./tables/table.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [DisplayRecordsComponent],
  imports: [
    CommonModule,
    SharedModule,
    DisplayRecordsRoutingModule,
    TableModule,
    RouterModule,
  ],
})
export class DisplayRecordsModule {}
