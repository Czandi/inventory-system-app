import { Inventory } from "./../../shared/models/inventory.model";
import { ConfigService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InventoryService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAllInventories(
    page: number,
    orderBy: string,
    sortType: string,
    searchValue?: string
  ): Observable<any> {
    var url =
      this.config.inventoryUrl +
      this.config.page +
      page +
      this.config.pageSize +
      this.config.sortType +
      sortType +
      this.config.orderBy +
      orderBy;

    if (searchValue !== "" && searchValue !== undefined) {
      url += this.config.search + searchValue;
    }

    return this.http.get(url);
  }

  insertInventoryItem(
    idRecord: string,
    recordType: string,
    barcodes: number[]
  ) {
    return this.http.post<Inventory>(
      this.config.inventoryUrl +
        this.config.inventoryRecordValue +
        idRecord +
        this.config.inventoryRecordType +
        recordType,
      barcodes
    );
  }

  getReport(id: number) {
    return this.http.get(this.config.reportUrl + "/" + id);
  }
}
