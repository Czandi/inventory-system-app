import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit, AfterViewInit {
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

  ngAfterViewInit() {
    setTimeout(() => {
      const activeElement = document.getElementById(this.currentPage);
      if (activeElement !== null) {
        activeElement.classList.add("active");
      }
    }, 100);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.setActive(this.currentPage - 1);
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { page: this.currentPage },
        queryParamsHandling: "merge",
      });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setActive(this.currentPage + 1);
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { page: this.currentPage },
        queryParamsHandling: "merge",
      });
    }
  }

  loadPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.setActive(page);
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { page: this.currentPage },
        queryParamsHandling: "merge",
      });
    }
  }

  setActive(active) {
    const activeElement = document.getElementById(this.currentPage);
    activeElement.classList.remove("active");

    const newElement = document.getElementById(active);
    newElement.classList.add("active");

    this.currentPage = active;
  }
}
