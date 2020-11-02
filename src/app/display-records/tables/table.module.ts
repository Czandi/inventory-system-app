import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DeviceTableComponent } from "./device-table/device-table.component";
import { ModelTableComponent } from "./model-table/model-table.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../../shared/shared.module";
import { DeviceSetTableComponent } from "./device-set-table/device-set-table.component";
import { DeviceTypeTableComponent } from "./device-type-table/device-type-table.component";
import { OwnerTableComponent } from "./owner-table/owner-table.component";
import { RoomTableComponent } from "./room-table/room-table.component";

@NgModule({
  declarations: [
    DeviceTableComponent,
    ModelTableComponent,
    DeviceSetTableComponent,
    DeviceTypeTableComponent,
    OwnerTableComponent,
    RoomTableComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  exports: [
    DeviceTableComponent,
    ModelTableComponent,
    DeviceSetTableComponent,
    DeviceTypeTableComponent,
    OwnerTableComponent,
    RoomTableComponent,
  ],
})
export class TableModule {}
