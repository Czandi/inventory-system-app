import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";
import { DeviceSet } from "../../shared/models/deviceSet.model";
import { Device } from "app/shared/models/device.model";

@Injectable({
  providedIn: "root",
})
export class DeviceSetService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAllDeviceSetsWithDevicesCount(
    page: number,
    orderBy: string,
    sortType: string,
    searchValue?: string
  ): Observable<any> {
    var url =
      this.config.deviceSetUrl +
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

  getAllDeviceSets(): Observable<any> {
    var url = this.config.deviceSetUrl + "/all";
    return this.http.get(url);
  }

  getSingleDeviceSet(id: number): Observable<any> {
    return this.http.get(this.config.deviceSetUrl + "/" + id);
  }

  insertDeviceSet(deviceSet: DeviceSet): Observable<DeviceSet> {
    return this.http.post<DeviceSet>(this.config.ownerUrl, deviceSet);
  }

  updateDeviceSet(id: number, name: String): Observable<DeviceSet> {
    return this.http.put<DeviceSet>(this.config.deviceSetUrl + "/" + id, name);
  }
}
