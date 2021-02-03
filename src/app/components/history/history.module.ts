import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HistoryComponent } from "./history.component";

import { HistoryRoutingModule } from "./history-routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [HistoryComponent],
  imports: [CommonModule, SharedModule, HistoryRoutingModule],
})
export class HistoryModule {}
