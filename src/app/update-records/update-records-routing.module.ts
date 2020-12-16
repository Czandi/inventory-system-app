import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { UpdateRecordsComponent } from "./update-records.component";

const routes: Routes = [
  {
    path: "update-records",
    component: UpdateRecordsComponent,
    data: { animation: "UpdateRecords" },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateRecordsRoutingModule {}
