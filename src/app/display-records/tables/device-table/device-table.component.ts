import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { DeviceService } from "app/core/services/device.service";
import { SubjectService } from "../../../core/services/subjectService";
import { Table } from "../table.class";
import { TableData } from "../table.data";

@Component({
  selector: "app-device-table",
  templateUrl: "./device-table.component.html",
  styleUrls: ["../table.scss"],
})
export class DeviceTableComponent extends Table implements OnInit, OnDestroy {
  @Input() currentPage;
  @Input() searchValue;
  @ViewChild("serialNumber") serialNumberArrow: ElementRef;

  public tableData = [];
  public devices;

  constructor(
    subjectService: SubjectService,
    private deviceService: DeviceService
  ) {
    super(subjectService, "serialNumber", "asc", [
      "Option one",
      "Option two",
      "Option three",
    ]);
  }

  ngOnInit(): void {
    this.tableData = TableData.getDeviceTableData();
    this.getRecords();
    this.initialized = true;
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
