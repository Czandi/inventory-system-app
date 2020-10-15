import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { DeviceService } from "../service/device.service";
import { Subscription } from "rxjs";
import { SubjectService } from "app/service/subjectService";

@Component({
  selector: "app-display-records",
  templateUrl: "./display-records.component.html",
  styleUrls: ["./display-records.component.scss"],
})
export class DisplayRecordsComponent implements OnInit {
  @ViewChild("searchBar") searchBar: ElementRef;

  devices = [];
  pages = [];
  totalPages: number;

  private currentPage;
  private searchValue: string;
  private searchTimeout;

  private deviceSub: Subscription;

  constructor(
    private deviceService: DeviceService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.subjectService.currentPageEmmiter.subscribe((page) => {
      this.currentPage = page;
      this.pages = [];
      this.deviceSub = this.deviceService
        .getAllDevices(this.currentPage)
        .subscribe((data) => {
          this.devices = data.content;
          this.totalPages = data.totalPages;
          for (let i = 0; i < this.totalPages; i++) {
            this.pages.push(i + 1);
          }
        });
    });
  }

  getDeviceList() {
    this.deviceSub = this.deviceService
      .getAllDevices(this.currentPage)
      .subscribe((data) => {
        this.devices = data.content;
      });
  }

  getDevicesListBySearchValue() {
    this.deviceSub = this.deviceService
      .getAllDevices(this.currentPage, this.searchValue)
      .subscribe((data) => {
        this.devices = data.content;
      });
  }

  onTyping(event) {
    this.searchValue = this.searchBar.nativeElement.value;
    this.resetSearchTimeout();
  }

  resetSearchTimeout() {
    window.clearTimeout(this.searchTimeout);
    this.searchTimeout = window.setTimeout(() => {
      this.getDevicesListBySearchValue();
    }, 1000);
  }

  ngOnDestroy() {
    this.deviceSub.unsubscribe();
  }
}
