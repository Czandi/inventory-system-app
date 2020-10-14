import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";

import { DashboardComponent } from "./dashboard.component";
import { SharedModule } from "../shared/shared.module";
import { ContextMenuModule } from "../components/context-menu/context-menu.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    ContextMenuModule,
  ],
})
export class DashboardModule {}
