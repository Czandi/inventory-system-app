import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UpdateRecordsComponent } from "./update-records.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { UpdateRecordsRoutingModule } from "./update-records-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [UpdateRecordsComponent],
  imports: [
    CommonModule,
    SharedModule,
    UpdateRecordsRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UpdateRecordsModule {}
