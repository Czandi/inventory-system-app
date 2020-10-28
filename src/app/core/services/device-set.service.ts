import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";
import { DeviceSet } from "../../shared/models/deviceSet.model";

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

    console.log(url);

    return this.http.get(url);
  }

  getAllDeviceSets() {
    var url = this.config.deviceSetUrl + "/all";
    return this.http.get(url);
  }

  insertDeviceSet(deviceSet: DeviceSet): Observable<DeviceSet> {
    return this.http.post<DeviceSet>(this.config.ownerUrl, deviceSet);
  }
}
