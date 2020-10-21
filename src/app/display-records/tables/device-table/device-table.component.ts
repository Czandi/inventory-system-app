import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DeviceService } from "../../../core/services/device.service";
import { SubjectService } from "../../../core/services/subjectService";
import { Table } from "../table.class";
import { TableData } from "../table.data";

@Component({
  selector: "app-device-table",
  templateUrl: "./device-table.component.html",
  styleUrls: ["../table.scss"],
})
export class DeviceTableComponent extends Table implements OnInit {
  @ViewChild("serialNumber") serialNumberArrow: ElementRef;

  public tableData = [];
  public devices;

  constructor(
    subjectService: SubjectService,
    route: ActivatedRoute,
    private deviceService: DeviceService
  ) {
    super(subjectService, route, "serialNumber", "asc", [
      "Option one",
      "Option two",
      "Option three",
    ]);
  }

  ngOnInit(): void {
    this.tableData = TableData.getDeviceTableData();
    this.initialize();
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("serialNumber");
    this.currentArrow.classList.add("active");
  }

  getRecords() {
    this.apiSub = this.deviceService
      .getAllDevices(
        this.currentPage,
        this.sort.value,
        this.sort.type,
        this.searchValue
      )
      .subscribe((data) => {
        this.devices = data.content;
        this.subjectService.totalPageNumber.next(data.totalPages);
      });
  }
}
