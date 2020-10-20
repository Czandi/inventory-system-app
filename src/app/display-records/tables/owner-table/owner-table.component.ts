import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { OwnerService } from "../../../core/services/owner.service";
import { SubjectService } from "../../../core/services/subjectService";
import { Table } from "../table.class";
import { TableData } from "../table.data";

@Component({
  selector: "app-owner-table",
  templateUrl: "./owner-table.component.html",
  styleUrls: ["../table.scss"],
})
export class OwnerTableComponent extends Table implements OnInit {
  @Input() currentPage;
  @Input() searchValue;
  @ViewChild("name") serialNumberArrow: ElementRef;

  public tableData = [];
  public owners;

  constructor(
    subjectService: SubjectService,
    private ownerService: OwnerService
  ) {
    super(subjectService, "name", "asc", [
      "Option one",
      "Option two",
      "Option three",
    ]);
  }

  ngOnInit() {
    this.tableData = TableData.getOwnerTableData();
    this.getRecords();
    this.initialized = true;
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("name");
    this.currentArrow.classList.add("active");
  }

  getRecords() {
    this.apiSub = this.ownerService
      .getAllOwners(
        this.currentPage,
        this.sort.value,
        this.sort.type,
        this.searchValue
      )
      .subscribe((data) => {
        this.owners = data.content;
        this.subjectService.totalPageNumber.next(data.totalPages);
      });
  }
}
