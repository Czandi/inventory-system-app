import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from "@angular/core";
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
  public currentTable = "device";
  public searchValue = "";

  private search = "";
  private searchTimeout;
  private paginationSub: Subscription;
  private pageSub: Subscription;

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.paginationSub = this.subjectService.currentPageEmitter.subscribe(
      (page) => {
        this.currentPage = page;
      }
    );

    this.pageSub = this.subjectService.totalPageNumber.subscribe(
      (totalPages) => {
        this.totalPages = totalPages;
        this.pages = [];
        for (let i = 0; i < this.totalPages; i++) {
          this.pages.push(i + 1);
        }
      }
    );
  }

  onTyping() {
    this.search = this.searchBar.nativeElement.value;
    this.resetSearchTimeout();
  }

  resetSearchTimeout() {
    window.clearTimeout(this.searchTimeout);
    this.searchTimeout = window.setTimeout(() => {
      console.log("Setting searchValue to " + this.search);
      this.searchValue = this.search;
    }, 500);
  }

  onDisplaySelect(element) {
    this.currentPage = 1;
    this.searchValue = "";
    this.currentTable = element;
  }

  ngOnDestroy() {
    this.paginationSub.unsubscribe();
    this.pageSub.unsubscribe();
  }
}
