import { Component, Input, OnInit } from "@angular/core";
import { SubjectService } from "app/service/subjectService";
import { ContextMenu } from "app/shared/models/context-menu.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-device-table",
  templateUrl: "./device-table.component.html",
  styleUrls: ["./device-table.component.scss"],
})
export class DeviceTableComponent implements OnInit {
  @Input() devices = [];

  private contextMenuData = new ContextMenu();
  private clickedElement;
  private contextMenuSub: Subscription;

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {}

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
}
