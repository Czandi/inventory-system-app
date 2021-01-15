import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @ViewChild("displayRecords") displayRecordsElement;

  private activeItem = null;
  private activeElement;

  constructor(private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.activeElement = this.displayRecordsElement.nativeElement;
    this.activeItem = this.displayRecordsElement.nativeElement;
    this.activeItem.classList.add("active");
  }

  toggleSubmenu(element) {
    if (this.activeElement === element) {
      element.classList.remove("active");
      this.activeElement = null;
    } else {
      if (this.activeElement !== null) {
        this.activeElement.classList.remove("active");
      }
      this.activeElement = element;
      element.classList.add("active");
    }
  }

  setLink(link, element, page?: number) {
    console.log(element);

    this.setActiveItem(element);

    if (page) {
      this.router.navigate([link], {
        queryParams: { page: 1 },
      });
    } else {
      this.router.navigate([link], {});
    }
  }

  setActiveItem(element) {
    if (this.activeItem !== null) {
      this.activeItem.classList.remove("active");
    }
    this.activeItem = element;
    this.activeItem.classList.add("active");
  }
}
