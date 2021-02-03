import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AddRecordComponent } from "./add-record.component";

import { AddRecordRoutingModule } from "./add-record-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [AddRecordComponent],
  imports: [
    CommonModule,
    SharedModule,
    AddRecordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AddRecordModule {}
