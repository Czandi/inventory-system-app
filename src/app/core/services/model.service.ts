import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Device } from "../../shared/models/device.model";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ModelService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAllModels(
    page: number,
    orderBy: string,
    sortType: string,
    searchValue?: string
  ): Observable<any> {
    var url =
      this.config.modelUrl +
      this.config.page +
      page +
      this.config.sortType +
      sortType +
      this.config.orderBy +
      orderBy;

    if (searchValue != "") {
      url += this.config.search + searchValue;
    }

    console.log(url);

    return this.http.get<Device[]>(url);
  }
}
