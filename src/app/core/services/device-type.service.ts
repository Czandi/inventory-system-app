import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";
import { DeviceType } from "app/shared/models/type.model";

@Injectable({
  providedIn: "root",
})
export class DeviceTypeService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAllDeviceTypesWithDevicesCount(
    page: number,
    orderBy: string,
    sortType: string,
    searchValue?: string
  ): Observable<any> {
    var url =
      this.config.deviceTypeUrl +
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

    return this.http.get(url);
  }

  getAllDeviceTypes() {
    var url = this.config.deviceTypeUrl + "/all";
    return this.http.get(url);
  }

  insertDeviceType(deviceType: DeviceType): Observable<DeviceType> {
    return this.http.post<DeviceType>(this.config.deviceTypeUrl, deviceType);
  }
}
