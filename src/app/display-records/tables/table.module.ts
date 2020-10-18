import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DeviceTableComponent } from "./device-table/device-table.component";
import { ModelTableComponent } from "./model-table/model-table.component";

import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [DeviceTableComponent, ModelTableComponent],
  imports: [CommonModule, SharedModule],
  exports: [DeviceTableComponent, ModelTableComponent],
})
export class TableModule {}
