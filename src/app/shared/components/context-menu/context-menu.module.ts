import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ContextMenuComponent } from "./context-menu.component";
import { SharedModule } from "../../shared.module";

@NgModule({
  declarations: [ContextMenuComponent],
  imports: [CommonModule, SharedModule],
  exports: [ContextMenuComponent],
})
export class ContextMenuModule {}
