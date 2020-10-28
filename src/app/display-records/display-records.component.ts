import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { SubjectService } from "../core/services/subject.service";

@Component({
  selector: "app-display-records",
  templateUrl: "./display-records.component.html",
  styleUrls: ["./display-records.component.scss"],
})
export class DisplayRecordsComponent implements OnInit, OnDestroy {
  @ViewChild("searchBar") searchBar: ElementRef;
  @ViewChild("device") deviceTableButton: ElementRef;

  private static lastRoute;
  private static lastTableButtonId;

  public records = [];
  public pages = [];
  public totalPages: number;
  public currentPage = 1;
  public searchValue = "";
  public currentRoute;
  public blured = false;

  private activeTableButton;
  private search = "";
  private searchTimeout;
  private paginationSub: Subscription;
  private pageSub: Subscription;
  private paramsSub: Subscription;

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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

    if (DisplayRecordsComponent.lastRoute) {
      this.currentRoute = DisplayRecordsComponent.lastRoute;
    } else {
      this.currentRoute = "/device-table";
    }

    this.subjectService.blur.subscribe((blur) => {
      this.blured = blur;
    });

    this.updateRoute();
  }

  ngAfterViewInit() {
    if (DisplayRecordsComponent.lastTableButtonId) {
      this.activeTableButton = document.getElementById(
        DisplayRecordsComponent.lastTableButtonId
      );
      console.log(this.activeTableButton);
    } else {
      this.activeTableButton = this.deviceTableButton.nativeElement;
    }
    this.activeTableButton.classList.add("active");
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

  setRouterLink(route, element, elementId) {
    this.currentPage = 1;
    this.searchValue = "";
    this.currentRoute = route;
    this.activeTableButton.classList.remove("active");
    this.activeTableButton = element;
    DisplayRecordsComponent.lastTableButtonId = elementId;
    this.activeTableButton.classList.add("active");
    DisplayRecordsComponent.lastRoute = this.currentRoute;
    console.log(this.activeTableButton);
    this.updateRoute();
  }

  updateRoute() {
    if (!this.router.url.includes("edit")) {
      this.router.navigate([
        "/display-records/" +
          this.currentRoute +
          "/" +
          this.currentPage +
          "/" +
          this.searchValue,
      ]);
    }
  }

  ngOnDestroy() {
    this.paginationSub.unsubscribe();
    this.pageSub.unsubscribe();
  }
}
