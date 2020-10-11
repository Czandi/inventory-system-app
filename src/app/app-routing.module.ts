import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components";

import { DisplayRecordsRoutingModule } from "./display-records/display-records-routing.module";
import { DashboardRoutingModule } from "./dashboard/dashboard-routing.module";
import { DisplayRecordsComponent } from "./display-records/display-records.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DisplayRecordsRoutingModule,
    DashboardRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
