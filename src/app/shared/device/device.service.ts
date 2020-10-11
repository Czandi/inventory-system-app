import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DeviceService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    console.log(this.http.get("http://localhost:4201/devices"));
    return this.http.get("http://localhost:4201/devices");
  }
}
