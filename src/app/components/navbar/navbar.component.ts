import { Subscription } from "rxjs";
import { SubjectService } from "app/core/services/subject.service";
import { Router } from "@angular/router";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild("displayRecords") displayRecords;
  @ViewChild("productTable") productTable;
  @ViewChild("modelTable") modelTable;
  @ViewChild("productTypeTable") productTypeTable;
  @ViewChild("productSetTable") productSetTable;
  @ViewChild("ownerTable") ownerTable;
  @ViewChild("roomTable") roomTable;

  private tables: { [key: string]: number };
  private activeItem = null;
  private activeElement;
  private subjectSub: Subscription;

  constructor(private router: Router, private subjectService: SubjectService) {}

  ngOnInit() {
    this.subjectSub = this.subjectService.activeTable.subscribe(
      (activeTable) => {
        this.setActiveItem(this.tables[activeTable]);
      }
    );
  }

  ngOnDestroy() {
    this.subjectSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.activeElement = this.displayRecords.nativeElement;
    // this.activeItem = this.productTable.nativeElement;
    // this.activeItem.classList.add("active");

    this.tables = {
      productTable: this.productTable.nativeElement,
      modelTable: this.modelTable.nativeElement,
      productTypeTable: this.productTypeTable.nativeElement,
      productSetTable: this.productSetTable.nativeElement,
      ownerTable: this.ownerTable.nativeElement,
      roomTable: this.roomTable.nativeElement,
    };
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

  setLink(link, element, page?: number, emitter?) {
    if (page) {
      this.router.navigate([link], {
        queryParams: { page: 1 },
      });
    } else {
      this.router.navigate([link], {});
    }

    if (emitter) {
      setTimeout(() => {
        this.subjectService.activeTable.next(emitter);
      }, 50);
    } else {
      this.setActiveItem(element);
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
