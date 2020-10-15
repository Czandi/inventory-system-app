import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { DeviceService } from "../service/device.service";
import { Subscription } from "rxjs";
import { SubjectService } from "app/service/subjectService";

@Component({
  selector: "app-display-records",
  templateUrl: "./display-records.component.html",
  styleUrls: ["./display-records.component.scss"],
})
export class DisplayRecordsComponent implements OnInit, OnDestroy {
  @ViewChild("searchBar") searchBar: ElementRef;

  devices = [];
  pages = [];
  totalPages: number;

  private currentPage = 1;
  private searchValue: string;
  private searchTimeout;
  private sortValue = "serialNumber";
  private sortType = "asc";

  private deviceSub: Subscription;
  private paginationSub: Subscription;
  private sortingSub: Subscription;

  constructor(
    private deviceService: DeviceService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.paginationSub = this.subjectService.currentPageEmitter.subscribe(
      (page) => {
        this.currentPage = page;
        this.getDeviceList();
      }
    );

    this.sortingSub = this.subjectService.sortValueEmitter.subscribe((sort) => {
      this.sortValue = sort.value;
      this.sortType = sort.sortType;
      console.log(this.sortType, this.sortValue);
      this.getDeviceList();
    });

    this.getDeviceList();
  }

  getDeviceList() {
    if (this.searchValue == null || this.searchValue == "") {
      this.deviceSub = this.deviceService
        .getAllDevices(this.currentPage, this.sortValue, this.sortType)
        .subscribe((data) => {
          this.devices = data.content;
          this.totalPages = data.totalPages;
          this.pages = [];
          for (let i = 0; i < this.totalPages; i++) {
            this.pages.push(i + 1);
          }
        });
    } else {
      this.deviceSub = this.deviceService
        .getAllDevices(
          this.currentPage,
          this.sortValue,
          this.sortType,
          this.searchValue
        )
        .subscribe((data) => {
          this.devices = data.content;
          this.totalPages = data.totalPages;
          this.pages = [];
          for (let i = 0; i < this.totalPages; i++) {
            this.pages.push(i + 1);
          }
        });
    }
  }

  onTyping() {
    this.searchValue = this.searchBar.nativeElement.value;
    this.resetSearchTimeout();
  }

  resetSearchTimeout() {
    window.clearTimeout(this.searchTimeout);
    this.searchTimeout = window.setTimeout(() => {
      this.getDeviceList();
    }, 1000);
  }

  ngOnDestroy() {
    this.deviceSub.unsubscribe();
    this.paginationSub.unsubscribe();
  }
}
