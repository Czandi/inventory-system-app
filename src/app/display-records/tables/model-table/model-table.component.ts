import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModelService } from "app/core/services/model.service";
import { SubjectService } from "../../../core/services/subject.service";
import { Table } from "../table.class";
import { Data } from "../../../shared/data";

@Component({
  selector: "app-model-table",
  templateUrl: "./model-table.component.html",
  styleUrls: ["../table.scss"],
})
export class ModelTableComponent extends Table implements OnInit, OnDestroy {
  @ViewChild("name") serialNumberArrow: ElementRef;

  public tableData = [];
  public models;

  constructor(
    subjectService: SubjectService,
    activatedRoute: ActivatedRoute,
    route: Router,
    private modelService: ModelService
  ) {
    super(subjectService, activatedRoute, route, "name", "asc", [
      "Option one",
      "Option two",
      "Option three",
    ]);
  }

  ngOnInit() {
    this.tableData = Data.getModelTableData();
    this.initialize();
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("name");
    this.currentArrow.classList.add("active");
  }

  getRecords() {
    this.apiSub = this.modelService
      .getAllModelsWithDeviceCount(
        this.currentPage,
        this.sort.value,
        this.sort.type,
        this.searchValue
      )
      .subscribe((data) => {
        this.models = data.content;
        this.subjectService.totalPageNumber.next(data.totalPages);
      });
  }
}
