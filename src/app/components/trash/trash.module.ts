import { SharedModule } from "./../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { TrashComponent } from "./trash.component";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [TrashComponent],
  imports: [CommonModule, SharedModule],
})
export class TrashModule {}
