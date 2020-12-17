import { SortInfo } from "./../shared/models/sortInfo.model";
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceService } from "./../core/services/device.service";
import { Subscription } from "rxjs";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { DateService } from "app/core/services/date.service";

@Component({
  selector: "app-trash",
  templateUrl: "./trash.component.html",
  styleUrls: ["./trash.component.scss"],
})
export class TrashComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("searchBar") searchBar: ElementRef;

  public totalPages;
  public currentPage;
  public deletedRecords;
  public searchValue;

  private search = "";
  private searchTimeout;
  private currentSortValue: string;
  private currentSortType: string;
  private routeSub: Subscription;
  private currentArrow;
  private sort: SortInfo;

  constructor(
    private deviceService: DeviceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.sort = new SortInfo();
  }

  ngOnInit(): void {
    this.sort.value = "deletedDate";
    this.sort.type = "asc";
    this.searchValue = "";

    this.routeSub = this.activatedRoute.queryParams.subscribe((params) => {
      if (
        params["search"] !== undefined &&
        params["search"] !== this.searchValue
      ) {
        this.searchValue = params["search"];
        this.getRecords();
      } else {
        this.searchValue = "";
      }

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
    this.currentArrow = document.getElementById("serialNumber");
    this.currentArrow.classList.add("active");
  }

  getRecords() {
    this.deviceService
      .getDeletedDevices(
        this.currentPage,
        this.sort.value,
        this.sort.type,
        this.searchValue
      )
      .subscribe((records) => {
        this.deletedRecords = records.content;
        this.totalPages = records.totalPages;
      });
  }

  getDate(fullDate) {
    return DateService.getDate(fullDate);
  }

  getTime(fullDate) {
    return DateService.getTime(fullDate);
  }

  onTyping() {
    this.search = this.searchBar.nativeElement.value;
    this.resetSearchTimeout();
  }

  resetSearchTimeout() {
    window.clearTimeout(this.searchTimeout);
    this.searchTimeout = window.setTimeout(() => {
      this.router.navigate([], {
        queryParams: { search: this.search },
        queryParamsHandling: "merge",
      });
    }, 500);
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
}
