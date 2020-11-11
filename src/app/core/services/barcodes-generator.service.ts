import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BarcodesGeneratorService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  generateBarcode(barcode: number) {
    return (
      this.config.barcodeGeneratorUrl +
      "/" +
      barcode +
      ".png?margin=0&height=50"
    );
  }
}
