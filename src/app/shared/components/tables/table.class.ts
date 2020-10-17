import { ElementRef } from "@angular/core";
import { SubjectService } from "../../../service/subjectService";
import { ContextMenu } from "../../models/context-menu.model";
import { Subscription } from "rxjs";
import { SortInfo } from "../../models/sortInfo.model";

export class Table {
  devices = [];

  protected contextMenuData = new ContextMenu();
  protected clickedElement;
  protected contextMenuSub: Subscription;
  protected currentSortValue;
  protected currentSortType;
  protected currentArrow;
  protected contextMenuOptions;

  constructor(
    protected subjectService: SubjectService,
    currentSortValue: string,
    currentSortType: string,
    contextMenuOptions: Array<string>
  ) {
    this.currentSortValue = currentSortValue;
    this.currentSortType = currentSortType;
    this.contextMenuOptions = contextMenuOptions;
  }

  onRightClick(event, id: number) {
    this.contextMenuData.mouseX = event.pageX;
    this.contextMenuData.mouseY = event.pageY;
    this.contextMenuData.options = this.contextMenuOptions;
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

  setSortValue(value: string, elementId: string) {
    var sort = new SortInfo();
    sort.value = value;

    var element = document.getElementById(elementId);

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
