import { RaportsComponent } from "./raports/raports.component";
import { InventoryComponent } from "./inventory.component";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [InventoryComponent, RaportsComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class InventoryModule {}
