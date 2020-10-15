import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { SubjectService } from "app/service/subjectService";
import { ContextMenu } from "app/shared/models/context-menu.model";
import { Subscription } from "rxjs";
import { SortInfo } from "../../../models/sortInfo.model";

@Component({
  selector: "app-device-table",
  templateUrl: "./device-table.component.html",
  styleUrls: ["./device-table.component.scss"],
})
export class DeviceTableComponent implements OnInit {
  @Input() devices = [];
  @ViewChild("serialNumber") serialNumberArrow: ElementRef;
  @ViewChild("deviceModel") deviceModelArrow: ElementRef;
  @ViewChild("deviceType") deviceTypeArrow: ElementRef;
  @ViewChild("room") roomArrow: ElementRef;
  @ViewChild("owner") ownerArrow: ElementRef;
  @ViewChild("barCode") barCodeArrow: ElementRef;
  @ViewChild("setNumber") setNumberArrow: ElementRef;

  private contextMenuData = new ContextMenu();
  private clickedElement;
  private contextMenuSub: Subscription;
  private currentSortValue;
  private currentSortType;
  private currentArrow;

  constructor(
    private subjectService: SubjectService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    var sort = new SortInfo();
    sort.value = "serialNumber";
    sort.sortType = "asc";
    this.subjectService.sortValueEmitter.next(sort);
  }

  ngAfterViewInit() {
    this.currentArrow = this.serialNumberArrow.nativeElement;
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
