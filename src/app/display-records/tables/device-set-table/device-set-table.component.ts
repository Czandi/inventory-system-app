import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceSetService } from "app/core/services/device-set.service";
import { SubjectService } from "../../../core/services/subject.service";
import { Table } from "../table.class";
import { Data } from "../../../shared/data";

@Component({
  selector: "app-device-set-table",
  templateUrl: "./device-set-table.component.html",
  styleUrls: ["../table.scss"],
})
export class DeviceSetTableComponent extends Table implements OnInit {
  @ViewChild("name") serialNumberArrow: ElementRef;

  public tableData = [];
  public deviceSets;

  constructor(
    subjectService: SubjectService,
    activatedRoute: ActivatedRoute,
    router: Router,
    private deviceSetService: DeviceSetService
  ) {
    super(subjectService, activatedRoute, router, "name", "asc", [
      { name: "EDIT", route: router.url + "/edit" },
      { name: "DELETE", route: router.url + "/delete" },
    ]);
  }

  ngOnInit(): void {
    this.tableData = Data.getDeviceSetTableData();
    this.initialize();
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("name");
    this.currentArrow.classList.add("active");
  }

  getRecords() {
    this.apiSub = this.deviceSetService
      .getAllDeviceSetsWithDevicesCount(
        this.currentPage,
        this.sort.value,
        this.sort.type,
        this.searchValue
      )
      .subscribe((data) => {
        this.deviceSets = data.content;
        this.subjectService.totalPageNumber.next(data.totalPages);
      });
  }

  updateRecord() {
    this.navigateAfterUpdateRecord();
  }
}
