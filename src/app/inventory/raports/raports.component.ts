import { ActivatedRoute } from "@angular/router";
import { InventoryService } from "./../../core/services/inventory.service";
import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-raports",
  templateUrl: "./raports.component.html",
  styleUrls: ["./raports.component.scss"],
})
export class RaportsComponent implements OnInit {
  public inventories;
  public totalPages;
  public currentPage;

  private sortType = "asc";
  private orderBy = "date";
  private inventoryServiceSub: Subscription;
  private routeSub: Subscription;
  private currentArrow;

  constructor(
    private inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRecords();
    this.routeSub = this.activatedRoute.queryParams.subscribe((params) => {
      if (params["page"] !== undefined && params["page"] !== this.currentPage) {
        this.currentPage = params["page"];
        this.getRecords();
      }
    });
  }

  getRecords() {
    this.inventoryServiceSub = this.inventoryService
      .getAllInventories(this.currentPage, this.orderBy, this.sortType)
      .subscribe((inventories) => {
        this.inventories = inventories.content;
        this.totalPages = inventories.totalPages;
        console.log(inventories);
      });
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("date");
    this.currentArrow.classList.add("active");
  }

  ngOnDestroy() {
    this.inventoryServiceSub.unsubscribe();
  }

  setSortValue(id: string) {
    var element = document.getElementById(id);

    if (this.orderBy !== id) {
      this.currentArrow.classList.toggle("active");
      this.currentArrow.classList.remove("rotate");

      this.currentArrow = element;
      this.currentArrow.classList.toggle("active");

      this.orderBy = id;

      this.sortType = "asc";
    } else {
      this.currentArrow.classList.toggle("rotate");
      this.switchSortType();
    }
    this.getRecords();
  }

  switchSortType() {
    if (this.sortType === "asc") {
      this.sortType = "desc";
    } else if (this.sortType === "desc") {
      this.sortType = "asc";
    }
  }
}
