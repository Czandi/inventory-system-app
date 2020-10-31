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
        path: "device-table/:page",
        component: DeviceTableComponent,
        data: { animation: "DeviceTable" },
      },
      {
        path: "device-table/:page/:search-value",
        component: DeviceTableComponent,
        pathMatch: "full",
        data: { animation: "DeviceTable" },
      },
      {
        path: "device-table/:page/edit/:id",
        component: DeviceTableComponent,
        data: { animation: "DeviceTable" },
      },
      {
        path: "device-set-table/:page",
        component: DeviceSetTableComponent,
      },
      {
        path: "device-set-table/:page/:search-value",
        component: DeviceSetTableComponent,
      },
      {
        path: "device-set-table/:page/edit/:id",
        component: DeviceSetTableComponent,
      },
      {
        path: "device-type-table/:page",
        component: DeviceTypeTableComponent,
      },
      {
        path: "device-type-table/:page/:search-value",
        component: DeviceTypeTableComponent,
      },
      {
        path: "device-type-table/:page/edit/:id",
        component: DeviceTypeTableComponent,
      },
      {
        path: "model-table/:page",
        component: ModelTableComponent,
        data: { animation: "ModelTable" },
      },
      {
        path: "model-table/:page/:search-value",
        component: ModelTableComponent,
        data: { animation: "ModelTable" },
      },
      {
        path: "model-table/:page/edit/:id",
        component: ModelTableComponent,
        data: { animation: "ModelTable" },
      },
      { path: "owner-table/:page", component: OwnerTableComponent },
      {
        path: "owner-table/:page/:search-value",
        component: OwnerTableComponent,
      },
      { path: "owner-table/:page/edit/:id", component: OwnerTableComponent },
      { path: "room-table/:page", component: RoomTableComponent },
      {
        path: "room-table/:page/:search-value",
        component: RoomTableComponent,
      },
      { path: "room-table/:page/edit/:id", component: RoomTableComponent },
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
