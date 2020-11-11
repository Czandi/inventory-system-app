import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SubjectService } from "../../../core/services/subject.service";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit {
  public pages = [];
  @Input() totalPages;
  @Input() currentPage;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.currentPage },
      queryParamsHandling: "merge",
    });
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { page: this.currentPage },
        queryParamsHandling: "merge",
      });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { page: this.currentPage },
        queryParamsHandling: "merge",
      });
    }
  }

  loadPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { page: this.currentPage },
        queryParamsHandling: "merge",
      });
    }
  }
}
