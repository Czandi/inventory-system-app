import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DisplayRecordsComponent } from "./display-records.component";

import { DisplayRecordsRoutingModule } from "./display-records-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ContextMenuModule } from "../shared/components/context-menu/context-menu.module";
// import { DeviceTableModule } from "../shared/components/tables/device-table/device-table.madule";
import { TableModule } from "../shared/components/tables/table.module";
import { PaginationModule } from "../shared/components/pagination/pagination.module";

@NgModule({
  declarations: [DisplayRecordsComponent],
  imports: [
    CommonModule,
    SharedModule,
    DisplayRecordsRoutingModule,
    ContextMenuModule,
    TableModule,
    PaginationModule,
  ],
})
export class DisplayRecordsModule {}
