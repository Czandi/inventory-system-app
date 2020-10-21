import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { SubjectService } from "../core/services/subjectService";

@Component({
  selector: "app-display-records",
  templateUrl: "./display-records.component.html",
  styleUrls: ["./display-records.component.scss"],
})
export class DisplayRecordsComponent implements OnInit, OnDestroy {
  @ViewChild("searchBar") searchBar: ElementRef;

  public records = [];
  public pages = [];
  public totalPages: number;
  public currentPage = 1;
  public searchValue = "";

  private currentRoute = "device-table";
  private search = "";
  private searchTimeout;
  private paginationSub: Subscription;
  private pageSub: Subscription;

  constructor(private subjectService: SubjectService, private router: Router) {}

  ngOnInit(): void {
    this.paginationSub = this.subjectService.currentPageEmitter.subscribe(
      (page) => {
        this.currentPage = page;
        this.updateRoute();
      }
    );

    this.pageSub = this.subjectService.totalPageNumber.subscribe(
      (totalPages) => {
        this.totalPages = totalPages;
        this.pages = [];
        for (let i = 0; i < this.totalPages; i++) {
          this.pages.push(i + 1);
        }
        this.updateRoute();
      }
    );

    this.updateRoute();
  }

  onTyping() {
    this.search = this.searchBar.nativeElement.value;
    this.resetSearchTimeout();
  }

  resetSearchTimeout() {
    window.clearTimeout(this.searchTimeout);
    this.searchTimeout = window.setTimeout(() => {
      this.searchValue = this.search;
      this.updateRoute();
    }, 500);
  }

  onDisplaySelect(route) {
    this.currentPage = 1;
    this.searchValue = "";
    this.currentRoute = route;
    this.updateRoute();
  }

  updateRoute() {
    this.router.navigate([
      "/display-records/" +
        this.currentRoute +
        "/" +
        this.currentPage +
        "/" +
        this.searchValue,
    ]);
  }

  ngOnDestroy() {
    this.paginationSub.unsubscribe();
    this.pageSub.unsubscribe();
  }
}
