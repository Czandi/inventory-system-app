import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ModelService } from "app/core/services/model.service";
import { SubjectService } from "../../../core/services/subjectService";
import { Table } from "../table.class";
import { TableData } from "../table.data";

@Component({
  selector: "app-model-table",
  templateUrl: "./model-table.component.html",
  styleUrls: ["../table.component.scss"],
})
export class ModelTableComponent extends Table implements OnInit, OnDestroy {
  @Input() currentPage;
  @Input() searchValue;
  @ViewChild("name") serialNumberArrow: ElementRef;

  public tableData = [];
  public models;

  constructor(
    subjectService: SubjectService,
    private modelService: ModelService
  ) {
    super(subjectService, "name", "asc", [
      "Option one",
      "Option two",
      "Option three",
    ]);
  }

  ngOnInit() {
    this.tableData = TableData.getModelTableData();
    this.getRecords();
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("name");
    this.currentArrow.classList.add("active");
  }

  getRecords() {
    this.apiSub = this.modelService
      .getAllModels(
        this.currentPage,
        this.sort.value,
        this.sort.type,
        this.searchValue
      )
      .subscribe((data) => {
        this.models = data.content;
      });
  }
}
