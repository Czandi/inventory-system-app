import { DevicePageComponent } from "./device-page/device-page.component";
import { RecordPageComponent } from "./record-page.component";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [RecordPageComponent, DevicePageComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class RecordPageModule {}
