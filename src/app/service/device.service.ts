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

  getAllDevices(page: number, searchValue?: string): Observable<any> {
    if (searchValue) {
      console.log("Szukam " + searchValue);
      return this.http.get<Device[]>(
        this.config.deviceUrl + "/?page=" + page + "&search=" + searchValue
      );
    } else {
      return this.http.get<Device[]>(this.config.deviceUrl + "/?page=" + page);
    }
  }
}
