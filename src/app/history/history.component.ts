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
      .getDeviceHistory(
        this.currentPage,
        this.currentSortValue,
        this.currentSortType
      )
      .subscribe((history) => {
        console.log("test");
        this.history = history.content;
        this.totalPages = history.totalPages;
      });
  }

  mapAttributeNames(attribute) {
    switch (attribute) {
      case "name":
        return "PAGES.HISTORY.ATTRIBUTES.NAME";
        break;
      case "serial_number":
        return "PAGES.HISTORY.ATTRIBUTES.SERIAL_NUMBER";
        break;
      case "model":
        return "PAGES.HISTORY.ATTRIBUTES.MODEL";
        break;
      default:
        return attribute;
    }
  }

  getDate(fullDate) {
    let indexOfT = fullDate.indexOf("T");
    let date = fullDate.slice(0, indexOfT);

    return date;
  }

  getTime(fullDate) {
    let indexOfT = fullDate.indexOf("T");

    let time = fullDate.slice(indexOfT + 1);
    return time;
  }
}
