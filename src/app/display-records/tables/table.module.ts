import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DeviceTableComponent } from "./device-table/device-table.component";
import { ModelTableComponent } from "./model-table/model-table.component";

import { SharedModule } from "../../shared/shared.module";
import { DeviceSetTableComponent } from "./device-set-table/device-set-table.component";

@NgModule({
  declarations: [
    DeviceTableComponent,
    ModelTableComponent,
    DeviceSetTableComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [DeviceTableComponent, ModelTableComponent, DeviceSetTableComponent],
})
export class TableModule {}
