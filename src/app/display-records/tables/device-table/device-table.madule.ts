import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DeviceTableComponent } from "./device-table.component";

import { SharedModule } from "../../../shared/shared.module";
import { PaginationModule } from "../../../shared/components/pagination/pagination.module";

@NgModule({
  declarations: [DeviceTableComponent],
  imports: [CommonModule, SharedModule, PaginationModule],
  exports: [DeviceTableComponent],
})
export class DeviceTableModule {}
