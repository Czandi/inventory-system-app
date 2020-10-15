import { Component, Input, OnInit } from "@angular/core";
import { SubjectService } from "../../../service/subjectService";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit {
  @Input() pages;
  @Input() totalPages;
  private currentPage = 1;

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.subjectService.currentPageEmmiter.next(this.currentPage);
  }

  prevPage() {
    console.log(this.currentPage);
    if (this.currentPage > 1) {
      this.currentPage--;
      this.subjectService.currentPageEmmiter.next(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.subjectService.currentPageEmmiter.next(this.currentPage);
    }
  }

  loadPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.subjectService.currentPageEmmiter.next(this.currentPage);
    }
  }
}
