import { RaportPageComponent } from "./raports/raport-page/raport-page.component";
import { InventoryComponent } from "./inventory.component";
import { RaportsComponent } from "./raports/raports.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "inventory",
    component: InventoryComponent,
  },
  {
    path: "inventory/raports",
    component: RaportsComponent,
  },
  {
    path: "inventory/raports/:id",
    component: RaportPageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
