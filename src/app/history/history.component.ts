import { DateService } from "./../core/services/date.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { HistoryService } from "../core/services/history.service";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit {
  public totalPages;
  public currentPage;
  public history;

  private currentSortValue: string;
  private currentSortType: string;
  private routeSub: Subscription;

  constructor(
    private historyService: HistoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentSortValue = "date";
    this.currentSortType = "asc";

    this.routeSub = this.activatedRoute.queryParams.subscribe((params) => {
      if (params["page"] !== undefined && params["page"] !== this.currentPage) {
        this.currentPage = params["page"];
        this.getRecords();
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getRecords() {
    this.historyService
      .getDevicesHistory(
        this.currentPage,
        this.currentSortValue,
        this.currentSortType
      )
      .subscribe((history) => {
        this.history = history.content;
        this.totalPages = history.totalPages;
      });
  }

  getDate(fullDate) {
    return DateService.getDate(fullDate);
  }

  getTime(fullDate) {
    return DateService.getTime(fullDate);
  }

  getAttributeName(name) {
    let attribute = "TABLE_HEADERS.DEVICE.";

    switch (name) {
      case "room":
        attribute += "ROOM";
        break;

      case "device_set":
        attribute += "SET_NUMBER";
        break;

      case "owner":
        attribute += "OWNER";
        break;

      case "serial_number":
        attribute += "SERIAL_NUMBER";
        break;

      default:
        attribute = name;
    }

    return attribute;
  }
}
