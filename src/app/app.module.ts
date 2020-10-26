import "reflect-metadata";
import "../polyfills";

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { DisplayRecordsModule } from "./display-records/display-records.module";
import { AddRecordModule } from "./add-record/add-record.module";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { SubnavbarComponent } from "./shared/components/subnavbar/subnavbar.component";
import { MenubarComponent } from "./shared/components/menubar/menubar.component";
import { SubjectService } from "./core/services/subject.service";
import { ConfigService } from "./core/services/config.service";
import { DeviceService } from "./core/services/device.service";

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SubnavbarComponent,
    MenubarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    DashboardModule,
    DisplayRecordsModule,
    AppRoutingModule,
    AddRecordModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [SubjectService, ConfigService, DeviceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
