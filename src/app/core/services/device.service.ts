import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Observable, throwError } from "rxjs";
import { Device } from "app/shared/models/device.model";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DeviceService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAllDevices(
    page: number,
    orderBy: string,
    sortType: string,
    searchValue?: string
  ): Observable<any> {
    var url =
      this.config.deviceUrl +
      this.config.page +
      page +
      this.config.pageSize +
      this.config.sortType +
      sortType +
      this.config.orderBy +
      orderBy;

    if (searchValue != "") {
      url += this.config.search + searchValue;
    }

    console.log(url);

    return this.http.get(url);
  }

  insertDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(this.config.deviceUrl, device);
  }
}
