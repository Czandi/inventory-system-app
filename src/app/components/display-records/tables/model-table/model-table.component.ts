import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModelService } from "app/core/services/model.service";
import { SubjectService } from "../../../../core/services/subject.service";
import { Table } from "../table.class";
import { Data } from "../../../../shared/data";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Model } from "app/shared/models/model.model";
import { GlobalDataValidator } from "../../../../shared/globalDataValidator";
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
  public newRecords = [];
  public names: any = {};

  private ids: any = {};
  private modelsWithTypes = [];
  private currentName;
  private currentType;

  constructor(
    subjectService: SubjectService,
    activatedRoute: ActivatedRoute,
    router: Router,
    private modelService: ModelService,
    private deviceTypeService: DeviceTypeService
  ) {
    super(subjectService, activatedRoute, router, "name", "asc", [
      { name: "EDIT", action: "edit" },
      { name: "DELETE", action: "delete-model" },
    ]);
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
      modelType: new FormControl(""),
      modelCount: new FormControl("", Validators.required),
    });
  }

  getAutoCompleteData() {
    this.modelService.getAllModels().subscribe((data) => {
      this.insertNames(data, "modelName");
      this.insertIds(data, "modelName");
      this.insertModelsWithTypes(data);
    }).unsubscribe;

    this.deviceTypeService.getAllDeviceTypes().subscribe((data) => {
      this.insertNames(data, "modelType");
      this.insertIds(data, "modelType");
    }).unsubscribe;
  }

  public insertNames(data, id) {
    this.names[id] = [];
    for (let name of data) {
      let itemId = name["name"] === "null" ? "-" : name["name"];
      this.names[id].push(itemId);
    }
  }

  public insertIds(data, id) {
    this.ids[id] = [];
    for (let item of data) {
      let itemName = item["name"];
      let itemId = item["id"];
      this.ids[id][itemName] = itemId;
    }
  }

  public insertModelsWithTypes(data) {
    for (let record of data) {
      this.modelsWithTypes[record.name] = record.type.name;
    }
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
    let newModelName = this.modelForm.get("modelName").value.toLowerCase();
    let newModelType =
      this.modelForm.get("modelType").value.toLowerCase() === "-"
        ? "null"
        : this.modelForm.get("modelType").value.toLowerCase();

    console.log();

    if (this.modelForm.valid) {
      if (
        !this.modelExists(newModelName, newModelType) &&
        this.typeExists(newModelType)
      ) {
        let model = new Model();
        model.name = newModelName;
        model.idType = this.ids["modelType"][newModelType];
        this.updateRecordAndRedirect(model);
      } else if (
        this.currentName === newModelName &&
        this.currentType === newModelType
      ) {
        this.navigateAfterUpdateRecord();
      } else {
        this.newRecords.push({
          text: "TABLE_HEADERS.DEVICE.DEVICE_TYPE",
          name: newModelType,
          type: "deviceType",
        });
        console.log(this.newRecords);
        this.alertBox.openAlert();
      }
    }
  }

  modelExists(modelName, modelType) {
    if (this.modelsWithTypes[modelName] === modelType) {
      return true;
    } else {
      return false;
    }
  }

  typeExists(modelType) {
    if (this.names["modelType"].includes(modelType)) {
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

  updateInputValue() {
    this.modelService.getSingleModel(this.editedRecord).subscribe((model) => {
      let modelName = model["name"];
      let modelType = model["type"] === "null" ? "-" : model["type"];
      let modelCount = model["count"];

      this.currentName = modelName;
      this.currentType = modelType;

      this.modelForm.controls["modelName"].setValue(modelName);
      this.modelForm.controls["modelType"].setValue(modelType);
      this.modelForm.controls["modelCount"].setValue(modelCount);
    });
  }

  checkIfNameExists() {
    let modelName = this.modelForm.get("modelName").value.toLowerCase();
    if (
      this.names["modelName"].includes(modelName.toLowerCase()) &&
      modelName !== this.currentName
    ) {
      this.modelForm.controls["modelName"].setErrors({ incorrect: true });
    }
  }
}
