import { RaportsComponent } from "./raports/raports.component";
import { InventoryComponent } from "./inventory.component";
import { SharedModule } from "../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RaportPageComponent } from "./raports/raport-page/raport-page.component";

@NgModule({
  declarations: [InventoryComponent, RaportsComponent, RaportPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class InventoryModule {}
