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

  getSingleDeviceType(id: number): Observable<any> {
    return this.http.get(this.config.deviceTypeUrl + "/" + id);
  }

  insertDeviceType(deviceType: DeviceType): Observable<DeviceType> {
    return this.http.post<DeviceType>(this.config.deviceTypeUrl, deviceType);
  }

  updateDeviceType(id: number, name: String): Observable<any> {
    return this.http.put<DeviceType>(
      this.config.deviceTypeUrl + "/" + id,
      name
    );
  }
}
