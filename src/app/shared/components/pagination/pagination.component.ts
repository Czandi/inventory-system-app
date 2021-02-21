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

  convertPages() {
    let page: number = this.currentPage;
    this.pages = [];

    if (this.totalPages > 7) {
      if (page >= 1 && page <= 4) {
        for (let i = 1; i <= 5; i++) {
          this.pages.push(i);
        }
        this.pages.push("...");
        this.pages.push(this.totalPages);
      } else if (page > 4 && page <= this.totalPages - 4) {
        this.pages.push(1);
        this.pages.push("...");
        for (let i = 1; i > -2; i--) {
          this.pages.push(page - i);
        }
        this.pages.push("...");
        this.pages.push(this.totalPages);
      } else {
        this.pages.push(1);
        this.pages.push("...");
        for (let i = 4; i >= 0; i--) {
          this.pages.push(this.totalPages - i);
        }
      }
    } else {
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.convertPages();

      setTimeout(() => {
        const activeElement = document.getElementById(
          "page" + this.currentPage
        );
        console.log(activeElement);
        if (activeElement !== null) {
          activeElement.classList.add("active");
        }
      }, 100);
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
    const activeElement = document.getElementById("page" + this.currentPage);
    activeElement.classList.remove("active");

    const newElement = document.getElementById("page" + active);
    newElement.classList.add("active");

    this.currentPage = active;
    this.convertPages();
  }
}
