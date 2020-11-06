import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { SubjectService } from "../../../core/services/subject.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @ViewChild("wave") wave: ElementRef;
  @ViewChild("dashboard") dashboard: ElementRef;
  @ViewChild("displayRecords") displayRecords: ElementRef;
  @ViewChild("updateRecords") updateRecords: ElementRef;
  @ViewChild("importExport") importExport: ElementRef;
  @ViewChild("history") history: ElementRef;
  @ViewChild("addRecord") addRecord: ElementRef;

  public addRecordSubnavbarItems = [
    {
      item: "NAVBAR.ADD_RECORD.SUBMENU.DEVICE",
      route: "/add-record/device",
    },
    {
      item: "NAVBAR.ADD_RECORD.SUBMENU.DEVICE_SET",
      route: "/add-record/device-set",
    },
  ];

  public updateRecordsSubnavbarItems = [
    {
      item: "NAVBAR.UPDATE_RECORDS.SUBMENU.ROOMS",
      route: "/update-records/room",
    },
    {
      item: "NAVBAR.ADD_RECORD.SUBMENU.DEVICE_SET",
      route: "/update-records/set",
    },
  ];

  private names = [
    "dashboard",
    "displayRecords",
    "updateRecords",
    "importExport",
    "history",
    "addRecord",
  ];
  private activeId: number;
  private activeEl: ElementRef;
  private offset: number;
  private mouseOver = false;

  constructor(
    private renderer: Renderer2,
    private subjectService: SubjectService,
    private router: Router,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.setActiveAfterReload(this.router.url);
    }, 100);
  }

  ngAfterViewInit() {
    this.activeEl = this.dashboard;
    this.activeId = 1;
    this.calculateOffset();
    this.updateWavePosition();
  }

  onClick(id: number) {
    if (this.activeId != id) {
      this.setActive(id);
      this.calculateOffset();
      setTimeout(() => {
        this.updateWavePosition();
      }, 250);
    }
  }

  setActive(id) {
    this.activeId = id;
    this.activeEl.nativeElement.classList.toggle("active");

    switch (id) {
      case 1:
        this.activeEl = this.dashboard;
        break;
      case 2:
        this.activeEl = this.displayRecords;
        break;
      case 3:
        this.activeEl = this.updateRecords;
        break;
      case 4:
        this.activeEl = this.importExport;
        break;
      case 5:
        this.activeEl = this.history;
        break;
      case 6:
        this.activeEl = this.addRecord;
        break;
    }

    let name = this.names[id - 1];
    setTimeout(() => {
      this.activeEl.nativeElement.classList.toggle("active");
    }, 250);
    this.subjectService.submenuEmitter.next(name);
  }

  calculateOffset() {
    var wave = this.wave.nativeElement;
    var halfWaveHeight = wave.offsetHeight / 2;
    var activeElement = this.activeEl.nativeElement;
    this.offset =
      activeElement.offsetTop +
      activeElement.offsetHeight / 2 -
      halfWaveHeight -
      15;
  }

  updateWavePosition() {
    var wave = this.wave.nativeElement;
    this.renderer.setStyle(wave, "top", this.offset + "px");
  }

  mouseEnter(id: number) {
    if (!this.mouseOver) {
      if (id > this.activeId) {
        this.offset += 20;
      } else if (id < this.activeId) {
        this.offset -= 20;
      }
      this.mouseOver = true;
    }

    this.updateWavePosition();
  }

  mouseLeave(id: number) {
    if (this.mouseOver) {
      if (id > this.activeId) {
        this.offset -= 20;
      } else if (id < this.activeId) {
        this.offset += 20;
      }
      this.mouseOver = false;
    }

    this.updateWavePosition();
  }

  setActiveAfterReload(route) {
    let s = route.slice(1);
    let item = s.slice(0, s.indexOf("/"));

    switch (item) {
      case "dashboard":
        this.onClick(1);
        break;
      case "display-records":
        this.onClick(2);
        break;
      case "update-records":
        this.onClick(3);
        break;
      case "import-export":
        this.onClick(4);
        break;
      case "history":
        this.onClick(5);
        break;
      case "add-record":
        this.onClick(6);
        break;
    }
  }
}
