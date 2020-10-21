import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DisplayRecordsComponent } from "./display-records.component";
import { DeviceTableComponent } from "./tables/device-table/device-table.component";
import { DeviceSetTableComponent } from "./tables/device-set-table/device-set-table.component";
import { DeviceTypeTableComponent } from "./tables/device-type-table/device-type-table.component";
import { ModelTableComponent } from "./tables/model-table/model-table.component";
import { OwnerTableComponent } from "./tables/owner-table/owner-table.component";
import { RoomTableComponent } from "./tables/room-table/room-table.component";

const routes: Routes = [
  {
    path: "display-records",
    component: DisplayRecordsComponent,
    children: [
      {
        path: "device-table/:current-page",
        component: DeviceTableComponent,
        data: { animation: "DeviceTable" },
      },
      {
        path: "device-table/:current-page/:search-value",
        component: DeviceTableComponent,
        data: { animation: "DeviceTable" },
      },
      {
        path: "device-set-table/:current-page",
        component: DeviceSetTableComponent,
      },
      {
        path: "device-set-table/:current-page/:search-value",
        component: DeviceSetTableComponent,
      },
      {
        path: "device-type-table/:current-page",
        component: DeviceTypeTableComponent,
      },
      {
        path: "device-type-table/:current-page/:search-value",
        component: DeviceTypeTableComponent,
      },
      {
        path: "model-table/:current-page",
        component: ModelTableComponent,
        data: { animation: "ModelTable" },
      },
      {
        path: "model-table/:current-page/:search-value",
        component: ModelTableComponent,
        data: { animation: "ModelTable" },
      },
      { path: "owner-table/:current-page", component: OwnerTableComponent },
      {
        path: "owner-table/:current-page/:search-value",
        component: OwnerTableComponent,
      },
      { path: "room-table/:current-page", component: RoomTableComponent },
      {
        path: "room-table/:current-page/:search-value",
        component: RoomTableComponent,
      },
    ],
    data: { animation: "DisplayRecords" },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayRecordsRoutingModule {}
