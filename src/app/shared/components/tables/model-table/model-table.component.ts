import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { SubjectService } from "../../../../service/subjectService";
import { SortInfo } from "../../../models/sortInfo.model";
import { Table } from "../table.class";

@Component({
  selector: "app-model-table",
  templateUrl: "./model-table.component.html",
  styleUrls: ["../table.component.scss"],
})
export class ModelTableComponent extends Table implements OnInit {
  @Input() devices = [];
  @ViewChild("serialNumber") serialNumberArrow: ElementRef;

  constructor(subjectService: SubjectService) {
    super(subjectService, "serialNumber", "asc", [
      "Option one",
      "Option two",
      "Option three",
    ]);
  }

  ngOnInit(): void {
    var sort = new SortInfo();
    sort.value = this.currentSortValue;
    sort.sortType = this.currentSortType;
    this.subjectService.sortValueEmitter.next(sort);
  }

  ngAfterViewInit() {
    this.currentArrow = this.serialNumberArrow.nativeElement;
  }
}
