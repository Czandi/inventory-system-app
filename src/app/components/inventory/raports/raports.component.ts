import { ReportCreator } from "./report-generator";
import { ActivatedRoute } from "@angular/router";
import { InventoryService } from "./../../../core/services/inventory.service";
import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Packer } from "docx";
import { saveAs } from "file-saver";

@Component({
  selector: "app-raports",
  templateUrl: "./raports.component.html",
  styleUrls: ["./raports.component.scss"],
})
export class RaportsComponent implements OnInit {
  public inventories = [];
  public totalPages;
  public currentPage = 1;

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
      });
  }

  ngAfterViewInit() {
    if (this.inventories.length !== 0) {
      this.currentArrow = document.getElementById("date");
      this.currentArrow.classList.add("active");
    }
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

  download(id): void {
    this.inventoryService.getReport(id).subscribe((report) => {
      console.log(report);
      const documentCreator = new ReportCreator();
      const doc = documentCreator.create([
        report["date"],
        report["recordName"],
        report["missingRecords"],
        report["additionalRecords"],
        report["actualStock"],
        report["previousStock"],
      ]);

      Packer.toBlob(doc).then((blob) => {
        saveAs(
          blob,
          "report-" + report["date"] + "-" + report["recordName"] + ".docx"
        );
      });
    });
  }
}
