import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddRecordComponent } from "./add-record.component";

import { AddRecordRoutingModule } from "./add-record-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [AddRecordComponent],
  imports: [CommonModule, SharedModule, AddRecordRoutingModule],
})
export class AddRecordModule {}
