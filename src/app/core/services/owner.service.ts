import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";
import { Owner } from "../../shared/models/owner.model";

@Injectable({
  providedIn: "root",
})
export class OwnerService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAllOwnersWithDevicesCount(
    page: number,
    orderBy: string,
    sortType: string,
    searchValue?: string
  ): Observable<any> {
    var url =
      this.config.ownerUrl +
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

  getAllOwners(): Observable<any> {
    var url = this.config.ownerUrl + "/all";
    return this.http.get(url);
  }

  getSingleOwner(id: number) {
    return this.http.get(this.config.ownerUrl + "/" + id);
  }

  insertOwner(owner: Owner): Observable<Owner> {
    return this.http.post<Owner>(this.config.ownerUrl, owner);
  }

  updateOwner(id: number, name: String): Observable<Owner> {
    return this.http.put<Owner>(this.config.ownerUrl + "/" + id, name);
  }
}
