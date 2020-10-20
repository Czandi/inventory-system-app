import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DeviceSetService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAllDeviceSets(
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
}
