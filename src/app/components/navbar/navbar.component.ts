import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { SubjectService } from "../../service/subjectService";

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

  private activeEl: ElementRef;
  private activeId: number;
  private offset: number;
  private mouseOver = false;

  constructor(private renderer: Renderer2, private service: SubjectService) {}

  ngOnInit(): void {}

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
        var name = "dashboard";
        break;
      case 2:
        this.activeEl = this.displayRecords;
        var name = "displayRecords";
        break;
      case 3:
        this.activeEl = this.updateRecords;
        var name = "updateRecords";
        break;
      case 4:
        this.activeEl = this.importExport;
        var name = "importExport";
        break;
      case 5:
        this.activeEl = this.history;
        var name = "history";
        break;
      case 6:
        this.activeEl = this.addRecord;
        var name = "addRecord";
        break;
    }
    setTimeout(() => {
      this.activeEl.nativeElement.classList.toggle("active");
    }, 250);
    this.service.submenuEmitter.next(name);
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
}
