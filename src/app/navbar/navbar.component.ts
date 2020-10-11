import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { SubmenuService } from "app/core/services/SubmenuService";

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

  private active: ElementRef;

  constructor(private renderer: Renderer2, private service: SubmenuService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.active = this.dashboard;
    this.updateWavePosition();
  }

  updateWavePosition() {
    var wave = this.wave.nativeElement;
    var halfWaveHeight = wave.offsetHeight / 2;

    var activeElement = this.active.nativeElement;
    var offset =
      activeElement.offsetTop + activeElement.offsetHeight / 2 - halfWaveHeight;
    this.renderer.setStyle(wave, "top", offset + "px");
  }

  setActive(name: string) {
    this.active.nativeElement.classList.toggle("active");
    switch (name) {
      case "dashboard":
        this.active = this.dashboard;
        break;
      case "displayRecords":
        this.active = this.displayRecords;
        break;
      case "updateRecords":
        this.active = this.updateRecords;
        break;
      case "importExport":
        this.active = this.importExport;
        break;
      case "history":
        this.active = this.history;
        break;
      case "addRecord":
        this.active = this.addRecord;
        break;
    }
    this.service.newEvent(name);
    this.active.nativeElement.classList.toggle("active");
    this.updateWavePosition();
  }
}
