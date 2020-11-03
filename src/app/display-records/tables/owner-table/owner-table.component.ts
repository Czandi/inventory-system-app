import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OwnerService } from "../../../core/services/owner.service";
import { SubjectService } from "../../../core/services/subject.service";
import { Table } from "../table.class";
import { Data } from "../../../shared/data";

@Component({
  selector: "app-owner-table",
  templateUrl: "./owner-table.component.html",
  styleUrls: ["../table.scss"],
})
export class OwnerTableComponent extends Table implements OnInit {
  @ViewChild("name") serialNumberArrow: ElementRef;

  public tableData = [];
  public owners;

  constructor(
    subjectService: SubjectService,
    activatedRoute: ActivatedRoute,
    router: Router,
    private ownerService: OwnerService
  ) {
    super(subjectService, activatedRoute, router, "name", "asc", [
      { name: "EDIT", route: router.url + "/edit" },
      { name: "DELETE", route: router.url + "/delete" },
    ]);
  }

  ngOnInit() {
    this.tableData = Data.getOwnerTableData();
    this.initialize();
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("name");
    this.currentArrow.classList.add("active");
  }

  getRecords() {
    this.apiSub = this.ownerService
      .getAllOwnersWithDevicesCount(
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

  validateData() {
    this.navigateAfterUpdateRecord();
  }
}
