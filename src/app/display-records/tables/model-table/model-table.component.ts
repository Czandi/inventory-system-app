import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModelService } from "app/core/services/model.service";
import { SubjectService } from "../../../core/services/subject.service";
import { Table } from "../table.class";
import { Data } from "../../../shared/data";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Model } from "app/shared/models/model.model";
import { GlobalDataValidator } from "../../../shared/globalDataValidator";
import { DeviceTypeService } from "app/core/services/device-type.service";

@Component({
  selector: "app-model-table",
  templateUrl: "./model-table.component.html",
  styleUrls: ["../table.scss"],
})
export class ModelTableComponent extends Table implements OnInit, OnDestroy {
  @ViewChild("alertBox") alertBox;
  @ViewChild("name") serialNumberArrow: ElementRef;
  @ViewChild("deviceType") typeInputElement: ElementRef;

  public tableData = [];
  public models;
  public modelForm;
  public names: any = {};
  public newRecords = [];

  private gdv;

  constructor(
    subjectService: SubjectService,
    activatedRoute: ActivatedRoute,
    router: Router,
    private modelService: ModelService,
    private deviceTypeService: DeviceTypeService
  ) {
    super(subjectService, activatedRoute, router, "name", "asc", [
      { name: "EDIT", route: router.url + "/edit" },
      { name: "DELETE", route: router.url + "/delete" },
    ]);
    this.gdv = new GlobalDataValidator();
  }

  ngOnInit() {
    this.tableData = Data.getModelTableData();
    this.initFormGroup();
    this.initialize();
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("name");
    this.currentArrow.classList.add("active");
  }

  initFormGroup() {
    this.modelForm = new FormGroup({
      modelName: new FormControl("", Validators.required),
      modelType: new FormControl("", Validators.required),
      modelCount: new FormControl("", Validators.required),
    });
  }

  getAutoCompleteData() {
    this.modelService.getAllModels().subscribe((data) => {
      this.gdv.insertNames(data, "modelName");
      this.gdv.insertIds(data, "modelName");
      this.gdv.insertModelsWithTypes(data);
    }).unsubscribe;

    this.deviceTypeService.getAllDeviceTypes().subscribe((data) => {
      this.gdv.insertNames(data, "modelType");
      this.gdv.insertIds(data, "modelType");
    }).unsubscribe;

    this.names = this.gdv.names;
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

  validateData() {
    let newModelName = this.modelForm.get("modelName").value;
    let newModelType = this.modelForm.get("modelType").value;

    if (this.modelForm.valid) {
      if (!this.modelExists(newModelName, newModelType)) {
        let model = new Model();
        model.name = newModelName;
        model.idType = this.gdv.ids["modelType"][newModelType];
        this.updateRecordAndRedirect(model);
      } else {
        this.newRecords = this.gdv.newRecords;
        this.alertBox.openAlert();
      }
    }
  }

  modelExists(modelName, modelType) {
    if (this.gdv.modelsWithTypes[modelName] === modelType) {
      return true;
    } else {
      return false;
    }
  }

  updateRecordAndRedirect(record) {
    this.modelService.updateModel(this.editedRecord, record).subscribe(() => {
      this.navigateAfterUpdateRecord();
    });
  }

  updateRecord() {}

  updateInputValue() {
    this.modelService.getSingleModel(this.editedRecord).subscribe((model) => {
      let modelName = model["name"];
      let modelType = model["type"];
      let modelCount = model["count"];

      this.modelForm.controls["modelName"].setValue(modelName);
      this.modelForm.controls["modelType"].setValue(modelType);
      this.modelForm.controls["modelCount"].setValue(modelCount);
    });
  }
}
