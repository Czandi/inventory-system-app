import { Component, HostListener, OnInit, Renderer2 } from "@angular/core";
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
  itemOnPage = 10;
  private contextMenuData = new ContextMenu();
  private clickedElement;
  private contextMenuSub: Subscription;

  constructor(
    private router: Router,
    private deviceService: DeviceService,
    private subjectService: SubjectService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.deviceService.getAllDevices().subscribe((data) => {
      console.log(data);
      this.devices = data;
    });
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
    this.renderer.setStyle(
      this.clickedElement,
      "background-color",
      "rgba(0, 0, 0, .3)"
    );

    this.contextMenuSub = this.subjectService.contextMenuEmitter.subscribe(
      (data) => {
        if (data === "closed") {
          this.renderer.setStyle(
            this.clickedElement,
            "background-color",
            "transparent"
          );
          this.contextMenuSub = null;
        }
      }
    );
  }
}
