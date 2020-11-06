import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UpdateRecordsComponent } from "./update-records.component";
import { UpdateRoomComponent } from "./update-room/update-room.component";
import { UpdateSetComponent } from "./update-set/update-set.component";

import { UpdateRecordsRoutingModule } from "./update-records-routing.module";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    UpdateRecordsComponent,
    UpdateRoomComponent,
    UpdateSetComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UpdateRecordsRoutingModule,
    RouterModule,
  ],
})
export class UpdateRecordsModule {}
