import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Device } from "../shared/models/device.model";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DeviceService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAllDevices(
    page: number,
    orderBy: String,
    sortType: String,
    searchValue?: string
  ): Observable<any> {
    if (searchValue) {
      console.log("Szukam " + searchValue);
      return this.http.get<Device[]>(
        this.config.deviceUrl +
          "/?page=" +
          page +
          "&sortType=" +
          sortType +
          "&orderby=" +
          orderBy +
          "&search=" +
          searchValue
      );
    } else {
      console.log(
        this.config.deviceUrl +
          "/?page=" +
          page +
          "&sortType=" +
          sortType +
          "&orderBy=" +
          orderBy
      );
      return this.http.get<Device[]>(
        this.config.deviceUrl +
          "/?page=" +
          page +
          "&sortType=" +
          sortType +
          "&orderBy=" +
          orderBy
      );
    }
  }
}
