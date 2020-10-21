import { OnChanges, OnDestroy, SimpleChanges } from "@angular/core";
import { SubjectService } from "../../core/services/subjectService";
import { ContextMenu } from "../../shared/models/context-menu.model";
import { Subject, Subscription } from "rxjs";
import { SortInfo } from "../../shared/models/sortInfo.model";
import { ActivatedRoute } from "@angular/router";

export class Table implements OnDestroy {
  devices = [];

  protected contextMenuData = new ContextMenu();
  protected clickedElement;
  protected contextMenuSub: Subscription;
  protected currentSortValue;
  protected currentSortType;
  protected currentArrow;
  protected contextMenuOptions;
  protected currentPage;
  protected searchValue;
  protected sort = new SortInfo();
  protected apiSub: Subscription;
  protected routeSub: Subscription;
  protected initialized = false;

  constructor(
    protected subjectService: SubjectService,
    protected route: ActivatedRoute,
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

  initialize() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.validateAndSetSearchValue(params["search-value"]);
      this.currentPage = this.route.snapshot.params["current-page"];
      this.getRecords();
    });
    this.currentPage = this.route.snapshot.params["current-page"];
    this.validateAndSetSearchValue(this.route.snapshot.params["search-value"]);
    this.getRecords();
    this.initialized = true;
  }

  validateAndSetSearchValue(searchValue) {
    if (!searchValue) {
      this.searchValue = "";
    } else {
      this.searchValue = searchValue;
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
    }
    this.getRecords();
  }

  getRecords() {}

  switchSortType() {
    if (this.sort.type === "asc") {
      this.sort.type = "desc";
    } else if (this.sort.type === "desc") {
      this.sort.type = "asc";
    }
  }
}
