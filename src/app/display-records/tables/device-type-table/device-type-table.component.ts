import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DeviceTypeService } from "../../../core/services/device-type.service";
import { SubjectService } from "../../../core/services/subject.service";
import { Table } from "../table.class";
import { Data } from "../../../shared/data";

@Component({
  selector: "app-device-type-table",
  templateUrl: "./device-type-table.component.html",
  styleUrls: ["../table.scss"],
})
export class DeviceTypeTableComponent extends Table implements OnInit {
  @ViewChild("name") serialNumberArrow: ElementRef;

  public tableData = [];
  public deviceTypes;

  constructor(
    subjectService: SubjectService,
    route: ActivatedRoute,
    private deviceTypeService: DeviceTypeService
  ) {
    super(subjectService, route, "name", "asc", [
      "Option one",
      "Option two",
      "Option three",
    ]);
  }

  ngOnInit(): void {
    this.tableData = Data.getDeviceTypeTableData();
    this.initialize();
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("name");
    this.currentArrow.classList.add("active");
  }

  getRecords() {
    this.apiSub = this.deviceTypeService
      .getAllDeviceTypesWithDevicesCount(
        this.currentPage,
        this.sort.value,
        this.sort.type,
        this.searchValue
      )
      .subscribe((data) => {
        this.deviceTypes = data.content;
        this.subjectService.totalPageNumber.next(data.totalPages);
      });
  }
}
