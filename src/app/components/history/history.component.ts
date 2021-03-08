import { DateService } from "./../../core/services/date.service";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { HistoryService } from "../../core/services/history.service";
import { SortInfo } from "app/shared/models/sortInfo.model";
import { CsvService } from "app/core/services/csv.service";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit {
  @ViewChild("date") dateArrow;
  @ViewChild("searchBar") searchBar: ElementRef;

  public totalPages;
  public currentPage;
  public history = [];
  public searchValue = "";

  private currentSortValue: string;
  private routeSub: Subscription;
  private sort;
  private currentArrow;
  private search = "";
  private searchTimeout;
  private apiSub: Subscription;

  constructor(
    private historyService: HistoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private csvService: CsvService
  ) {
    this.sort = new SortInfo();
  }

  ngOnInit(): void {
    this.currentSortValue = "date";
    this.sort.type = "desc";

    this.routeSub = this.activatedRoute.queryParams.subscribe((params) => {
      if (params["page"] !== undefined && params["page"] !== this.currentPage) {
        this.currentPage = params["page"];
        this.getRecords();
      }

      if (params["search"] !== undefined) {
        this.searchValue = params["search"];
        this.getRecords();
      } else {
        this.searchValue = "";
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  ngAfterViewInit() {
    if (this.history.length !== 0) {
      setTimeout(() => {
        this.currentArrow = this.dateArrow.nativeElement;
        this.currentArrow.classList.add("active");
      }, 200);
    }
  }

  getRecords() {
    this.apiSub = this.historyService
      .getDevicesHistory(
        this.currentPage,
        this.currentSortValue,
        this.sort.type,
        this.searchValue
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

      case "inventory_number":
        attribute += "INVENTORY_NUMBER";
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
    this.getRecords();
  }

  switchSortType() {
    if (this.sort.type === "asc") {
      this.sort.type = "desc";
    } else if (this.sort.type === "desc") {
      this.sort.type = "asc";
    }
  }

  onTyping() {
    this.search =
      this.searchBar.nativeElement.value === "-"
        ? "null"
        : this.searchBar.nativeElement.value;
    this.resetSearchTimeout();
  }

  resetSearchTimeout() {
    window.clearTimeout(this.searchTimeout);
    this.searchTimeout = window.setTimeout(() => {
      this.searchValue = this.search;
      this.router.navigate([], {
        queryParams: { search: this.searchValue },
        queryParamsHandling: "merge",
      });
    }, 500);
  }

  saveRecords() {
    this.apiSub = this.historyService
      .getDevicesHistory(
        this.currentPage,
        this.currentSortValue,
        this.sort.type,
        this.searchValue
      )
      .subscribe((history) => {
        console.log(history.content);
        this.csvService.exportToCsv("dane.csv", history.content, [
          "Numer seryjny",
          "Numer inwentarzowy",
          "Kod kreskowy",
          "Zmieniony atrybut",
          "Stara wartosc",
          "Nowa wartosc",
          "Data",
        ]);
      });
  }
}
