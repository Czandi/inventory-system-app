import { Component, Input, OnInit } from "@angular/core";
import { SubjectService } from "../../../core/services/subject.service";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit {
  @Input() pages;
  @Input() totalPages;
  @Input() currentPage;

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.subjectService.currentPageEmitter.next(this.currentPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.subjectService.currentPageEmitter.next(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.subjectService.currentPageEmitter.next(this.currentPage);
    }
  }

  loadPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.subjectService.currentPageEmitter.next(this.currentPage);
    }
  }
}
