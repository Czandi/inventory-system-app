import { OnChanges, OnDestroy, SimpleChanges } from "@angular/core";
import { SubjectService } from "../../core/services/subjectService";
import { ContextMenu } from "../../shared/models/context-menu.model";
import { Subscription } from "rxjs";
import { SortInfo } from "../../shared/models/sortInfo.model";

export class Table implements OnDestroy, OnChanges {
  devices = [];

  protected contextMenuData = new ContextMenu();
  protected clickedElement;
  protected contextMenuSub: Subscription;
  protected currentSortValue;
  protected currentSortType;
  protected currentArrow;
  protected contextMenuOptions;
  protected sort = new SortInfo();
  protected apiSub: Subscription;

  constructor(
    protected subjectService: SubjectService,
    currentSortValue: string,
    currentSortType: string,
    contextMenuOptions: Array<string>
  ) {
    this.currentSortValue = currentSortValue;
    this.currentSortType = currentSortType;
    this.contextMenuOptions = contextMenuOptions;
    var sort = new SortInfo();
    this.sort.value = this.currentSortValue;
    this.sort.type = this.currentSortType;
    this.subjectService.sortValueEmitter.next(sort);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.searchValue) {
      this.getRecords();
    }
  }

  ngOnDestroy(): void {
    this.apiSub.unsubscribe();
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

  setSortValue(id: string) {
    this.sort.value = id;

    var element = document.getElementById(id);

    if (this.currentSortValue !== id) {
      this.currentArrow.classList.toggle("active");
      this.currentArrow.classList.remove("rotate");

      this.currentArrow = element;
      this.currentArrow.classList.toggle("active");

      this.currentSortValue = id;

      this.sort.type = "asc";
    } else {
      this.currentArrow.classList.toggle("rotate");
      this.switchSortType();
      this.sort.type = this.currentSortType;
    }
    this.getRecords();
  }

  getRecords() {
    console.log("Wczytuje dane");
  }

  switchSortType() {
    if (this.currentSortType === "asc") {
      this.currentSortType = "desc";
    } else if (this.currentSortType === "desc") {
      this.currentSortType = "asc";
    }
  }
}
