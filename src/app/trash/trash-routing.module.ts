import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TrashComponent } from "./trash.component";
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "trash",
    component: TrashComponent,
    data: { animation: "Trash" },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrashRoutingModule {}
