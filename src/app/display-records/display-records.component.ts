import {
  Component,
  HostListener,
  OnInit,
  Renderer2,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { DeviceService } from "../service/device.service";
import { ContextMenu } from "../shared/models/context-menu.model";
import { SubjectService } from "../service/subjectService";
import { Subscription } from "rxjs";

@Component({
  selector: "app-display-records",
  templateUrl: "./display-records.component.html",
  styleUrls: ["./display-records.component.scss"],
})
export class DisplayRecordsComponent implements OnInit {
  devices = [];
  pages = [];
  itemOnPage = 10;
  currentPage = 1;

  private totalPages: number;
  private contextMenuData = new ContextMenu();
  private clickedElement;
  private prevColor;
  private contextMenuSub: Subscription;
  private deviceSub: Subscription;

  constructor(
    private router: Router,
    private deviceService: DeviceService,
    private subjectService: SubjectService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.deviceSub = this.deviceService
      .getAllDevices(this.currentPage)
      .subscribe((data) => {
        this.devices = data.content;
        this.totalPages = data.totalPages;
        for (let i = 0; i < this.totalPages; i++) {
          this.pages.push(i + 1);
        }
      });
  }

  getDeviceList() {
    this.deviceSub = this.deviceService
      .getAllDevices(this.currentPage)
      .subscribe((data) => {
        this.devices = data.content;
      });
  }

  prevPage() {
    console.log(this.currentPage);
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getDeviceList();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getDeviceList();
    }
  }

  loadPage(page: number) {
    console.log(page);
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.getDeviceList();
    }
  }

  onRightClick(event, id: number) {
    this.contextMenuData.mouseX = event.pageX;
    this.contextMenuData.mouseY = event.pageY;
    this.contextMenuData.options = [
      "Option one",
      "Option two",
      "Option three",
      "Option four",
    ];
    this.contextMenuData.recordId = id;
    this.subjectService.contextMenuEmitter.next(this.contextMenuData);

    this.clickedElement = document.getElementById("device" + id);
    this.clickedElement.classList.toggle("active");

    this.contextMenuSub = this.subjectService.contextMenuEmitter.subscribe(
      (data) => {
        if (data === "closed") {
          this.clickedElement.classList.toggle("active");
          this.contextMenuSub.unsubscribe();
        }
      }
    );
  }

  ngOnDestroy() {
    this.deviceSub.unsubscribe();
  }
}
