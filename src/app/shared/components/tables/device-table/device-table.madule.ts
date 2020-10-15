import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DeviceTableComponent } from "./device-table.component";
import { SubjectService } from "../../../../service/subjectService";

import { SharedModule } from "../../../shared.module";
import { ContextMenu } from "app/shared/models/context-menu.model";
import { Subscription } from "rxjs";

@NgModule({
  declarations: [DeviceTableComponent],
  imports: [CommonModule, SharedModule],
  exports: [DeviceTableComponent],
})
export class DeviceTableModule {
  private contextMenuData = new ContextMenu();
  private clickedElement;
  private contextMenuSub: Subscription;
  private currentSortValue = "serialNumber";
  private currentSortType = "asc";
  private currentArrow;

  constructor(private subjectService: SubjectService) {}

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

  setSortValue(value: string, element: ElementRef) {
    var sort = new SortInfo();
    sort.value = value;

    if (this.currentSortValue !== value) {
      this.currentArrow.classList.toggle("active");
      this.currentArrow.classList.remove("rotate");

      this.currentArrow = element;
      this.currentArrow.classList.toggle("active");

      this.currentSortValue = value;

      sort.sortType = "asc";
    } else {
      this.currentArrow.classList.toggle("rotate");
      this.switchSortType();
      sort.sortType = this.currentSortType;
    }

    this.subjectService.sortValueEmitter.next(sort);
  }

  switchSortType() {
    if (this.currentSortType === "asc") {
      this.currentSortType = "desc";
    } else if (this.currentSortType === "desc") {
      this.currentSortType = "asc";
    }
  }
}
