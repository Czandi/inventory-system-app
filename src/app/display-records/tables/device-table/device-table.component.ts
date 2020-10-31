import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceService } from "../../../core/services/device.service";
import { SubjectService } from "../../../core/services/subject.service";
import { Table } from "../table.class";
import { Data } from "../../../shared/data";

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
    activatedRoute: ActivatedRoute,
    private deviceService: DeviceService,
    router: Router
  ) {
    super(subjectService, activatedRoute, router, "serialNumber", "asc", [
      { name: "EDIT", route: router.url + "/edit" },
      { name: "DELETE", route: router.url + "/delete" },
    ]);
  }

  ngOnInit(): void {
    this.tableData = Data.getDeviceTableData();
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

  updateRecord() {
    this.route.navigate(["display-records/device-table/1"]);
  }
}
