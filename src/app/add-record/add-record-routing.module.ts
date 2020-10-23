import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AddRecordComponent } from "./add-record.component";
import { AddDeviceComponent } from "./add-device/add-device.component";
import { AddDeviceSetComponent } from "./add-device-set/add-device-set.component";

const routes: Routes = [
  {
    path: "add-record",
    component: AddRecordComponent,
    children: [
      {
        path: "device",
        component: AddDeviceComponent,
      },
      {
        path: "device-set",
        component: AddDeviceSetComponent,
      },
    ],
    data: { animation: "AddRecord" },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRecordRoutingModule {}
