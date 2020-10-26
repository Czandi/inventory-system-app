import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AddRecordComponent } from "./add-record.component";

import { AddRecordRoutingModule } from "./add-record-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AlertBoxComponent } from "./alert-box/alert-box.component";

@NgModule({
  declarations: [AddRecordComponent, AlertBoxComponent],
  imports: [
    CommonModule,
    SharedModule,
    AddRecordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AddRecordModule {}
