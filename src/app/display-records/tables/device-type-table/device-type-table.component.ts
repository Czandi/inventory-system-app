import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { DeviceTypeService } from "../../../core/services/device-type.service";
import { SubjectService } from "../../../core/services/subjectService";
import { Table } from "../table.class";
import { TableData } from "../table.data";

@Component({
  selector: "app-device-type-table",
  templateUrl: "./device-type-table.component.html",
  styleUrls: ["../table.scss"],
})
export class DeviceTypeTableComponent extends Table implements OnInit {
  @Input() currentPage;
  @Input() searchValue;
  @ViewChild("name") serialNumberArrow: ElementRef;

  public tableData = [];
  public deviceTypes;

  constructor(
    subjectService: SubjectService,
    private deviceTypeService: DeviceTypeService
  ) {
    super(subjectService, "name", "asc", [
      "Option one",
      "Option two",
      "Option three",
    ]);
  }

  ngOnInit(): void {
    this.tableData = TableData.getDeviceTypeTableData();
    this.getRecords();
    this.initialized = true;
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("name");
    this.currentArrow.classList.add("active");
  }

  getRecords() {
    this.apiSub = this.deviceTypeService
      .getAllDeviceTypes(
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
