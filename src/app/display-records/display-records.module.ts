import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DisplayRecordsRoutingModule } from "./display-records-routing.module";

import { DisplayRecordsComponent } from "./display-records.component";
import { SharedModule } from "../shared/shared.module";
import { ContextMenuModule } from "../components/context-menu/context-menu.module";

@NgModule({
  declarations: [DisplayRecordsComponent],
  imports: [
    CommonModule,
    SharedModule,
    DisplayRecordsRoutingModule,
    ContextMenuModule,
  ],
})
export class DisplayRecordsModule {}
