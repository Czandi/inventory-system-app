import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddRecordComponent } from "./add-record.component";

import { AddRecordRoutingModule } from "./add-record-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AddDeviceComponent } from "./add-device/add-device.component";
import { AddDeviceSetComponent } from "./add-device-set/add-device-set.component";

@NgModule({
  declarations: [AddRecordComponent, AddDeviceComponent, AddDeviceSetComponent],
  imports: [CommonModule, SharedModule, AddRecordRoutingModule],
})
export class AddRecordModule {}
