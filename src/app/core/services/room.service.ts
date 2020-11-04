import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";
import { Room } from "../../shared/models/room.model";

@Injectable({
  providedIn: "root",
})
export class RoomService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAllRoomsWithDevicesCount(
    page: number,
    orderBy: string,
    sortType: string,
    searchValue?: string
  ): Observable<any> {
    var url =
      this.config.roomUrl +
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

  getAllRooms(): Observable<any> {
    var url = this.config.roomUrl + "/all";
    return this.http.get(url);
  }

  getSingleRoom(id: number) {
    return this.http.get(this.config.roomUrl + "/" + id);
  }

  insertRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.config.roomUrl, room);
  }

  updateRoom(id: number, name: String): Observable<Room> {
    return this.http.put<Room>(this.config.roomUrl + "/" + id, name);
  }
}
