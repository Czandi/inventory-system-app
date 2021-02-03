import { DateService } from "./../../core/services/date.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { HistoryService } from "../../core/services/history.service";
import { SortInfo } from "app/shared/models/sortInfo.model";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit {
  @ViewChild("date") dateArrow;

  public totalPages;
  public currentPage;
  public history = [];

  private currentSortValue: string;
  private routeSub: Subscription;
  private sort;
  private currentArrow;

  constructor(
    private historyService: HistoryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.sort = new SortInfo();
  }

  ngOnInit(): void {
    this.currentSortValue = "date";
    this.sort.type = "asc";

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

  ngAfterViewInit() {
    setTimeout(() => {
      this.currentArrow = this.dateArrow.nativeElement;
      this.currentArrow.classList.add("active");
    }, 200);
  }

  getRecords() {
    this.historyService
      .getDevicesHistory(
        this.currentPage,
        this.currentSortValue,
        this.sort.type
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

  setSortValue(id: string) {
    this.sort.value = id;

    var element = document.getElementById(id);

    if (this.currentSortValue !== id) {
      this.currentArrow.classList.toggle("active");
      this.currentArrow.classList.remove("rotate");

      this.currentArrow = element;
      this.currentArrow.classList.toggle("active");

      this.currentSortValue = id;

      this.sort.type = "asc";
    } else {
      this.currentArrow.classList.toggle("rotate");
      this.switchSortType();
    }
    console.log(this.sort.type);

    this.getRecords();
  }

  switchSortType() {
    if (this.sort.type === "asc") {
      this.sort.type = "desc";
    } else if (this.sort.type === "desc") {
      this.sort.type = "asc";
    }
  }
}
