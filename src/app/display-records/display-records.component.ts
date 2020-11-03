import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SubjectService } from "../core/services/subject.service";

@Component({
  selector: "app-display-records",
  templateUrl: "./display-records.component.html",
  styleUrls: ["./display-records.component.scss"],
})
export class DisplayRecordsComponent implements OnInit {
  @ViewChild("searchBar") searchBar: ElementRef;
  @ViewChild("device") deviceTableButton: ElementRef;

  public records = [];
  public totalPages: number;
  public currentPage = 1;
  public searchValue = "";
  public currentRoute;
  public blured = false;
  public deviceForm;

  private search = "";
  private searchTimeout;

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subjectService.totalPageNumber.subscribe((totalPages) => {
      this.totalPages = totalPages;
    }).unsubscribe;

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params["edit"] !== undefined) {
        this.blured = true;
      } else {
        this.blured = false;
      }
    });

    // if (DisplayRecordsComponent.lastRoute) {
    //   this.currentRoute = DisplayRecordsComponent.lastRoute;
    // } else {
    //   this.currentRoute = "/device-table";
    // }
  }

  ngAfterViewChecked() {
    // if (DisplayRecordsComponent.lastTableButtonId) {
    //   this.activeTableButton = document.getElementById(
    //     DisplayRecordsComponent.lastTableButtonId
    //   );
    //   console.log(this.activeTableButton);
    // } else {
    //   this.activeTableButton = this.deviceTableButton.nativeElement;
    // }
  }

  onTyping() {
    this.search = this.searchBar.nativeElement.value;
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

  updateRoute() {
    if (!this.router.url.includes("edit")) {
      this.router.navigate(["/display-records/" + this.currentRoute], {
        queryParams: { page: this.currentPage, search: this.searchValue },
      });
    }
  }
}
