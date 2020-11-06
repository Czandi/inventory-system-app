import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { UpdateRecordsComponent } from "./update-records.component";
import { UpdateRoomComponent } from "./update-room/update-room.component";
import { UpdateSetComponent } from "./update-set/update-set.component";

const routes: Routes = [
  {
    path: "update-records",
    component: UpdateRecordsComponent,
    children: [
      {
        path: "set",
        component: UpdateSetComponent,
      },
      {
        path: "room",
        component: UpdateRoomComponent,
      },
    ],
    data: { animation: "UpdateRecords" },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateRecordsRoutingModule {}
