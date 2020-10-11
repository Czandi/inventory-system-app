import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DisplayRecordsComponent } from "./display-records.component";

const routes: Routes = [
  {
    path: "display-records",
    component: DisplayRecordsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayRecordsRoutingModule {}
