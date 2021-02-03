import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceTypeService } from "../../../../core/services/device-type.service";
import { SubjectService } from "../../../../core/services/subject.service";
import { Table } from "../table.class";
import { Data } from "../../../../shared/data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GlobalDataValidator } from "app/shared/globalDataValidator";

@Component({
  selector: "app-device-type-table",
  templateUrl: "./device-type-table.component.html",
  styleUrls: ["../table.scss"],
})
export class DeviceTypeTableComponent extends Table implements OnInit {
  @ViewChild("name") serialNumberArrow: ElementRef;

  public tableData = [];
  public deviceTypes;
  public typeForm;

  private gdv;
  private currentName;

  constructor(
    subjectService: SubjectService,
    activatedRoute: ActivatedRoute,
    router: Router,
    private deviceTypeService: DeviceTypeService
  ) {
    super(subjectService, activatedRoute, router, "name", "asc", [
      { name: "EDIT", action: "edit" },
      { name: "DELETE", action: "delete" },
    ]);

    this.gdv = new GlobalDataValidator();
  }

  ngOnInit(): void {
    this.tableData = Data.getDeviceTypeTableData();
    this.initFormGroup();
    this.initialize();
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("name");
    this.currentArrow.classList.add("active");
  }

  initFormGroup() {
    this.typeForm = new FormGroup({
      typeName: new FormControl("", Validators.required),
      typeCount: new FormControl("", Validators.required),
    });
  }

  getAutoCompleteData() {
    this.deviceTypeService.getAllDeviceTypes().subscribe((data) => {
      this.gdv.insertNames(data, "typeName");
      this.gdv.insertIds(data, "typeName");
    });
  }

  getRecords() {
    this.apiSub = this.deviceTypeService
      .getAllDeviceTypesWithDevicesCount(
        this.currentPage,
        this.sort.value,
        this.sort.type,
        this.searchValue
      )
      .subscribe((data) => {
        this.deviceTypes = data.content;
        this.subjectService.totalPageNumber.next(data.totalPages);
      });
  }

  validateData() {
    let newTypeName = this.typeForm.get("typeName").value.toLowerCase();

    if (this.typeForm.valid) {
      if (!this.typeExists(newTypeName)) {
        this.updateRecordAndRedirect(newTypeName);
      } else if (this.currentName.toLowerCase() === newTypeName.toLowerCase()) {
        this.navigateAfterUpdateRecord();
      } else {
      }
    }
  }

  typeExists(typeName) {
    if (this.gdv.names[typeName]) {
      console.log("Type exists");
      return true;
    } else {
      console.log("Type doesnt exists");
      return false;
    }
  }

  updateRecordAndRedirect(record) {
    this.deviceTypeService
      .updateDeviceType(this.editedRecord, record)
      .subscribe(() => {
        this.navigateAfterUpdateRecord();
      });
  }

  updateInputValue() {
    this.deviceTypeService
      .getSingleDeviceType(this.editedRecord)
      .subscribe((deviceType) => {
        let typeName = deviceType["name"];
        let typeCount = deviceType["count"];

        this.currentName = typeName;

        this.typeForm.controls["typeName"].setValue(typeName);
        this.typeForm.controls["typeCount"].setValue(typeCount);
      });
  }

  checkIfNameExists() {
    let typeName = this.typeForm.get("typeName").value.toLowerCase();
    if (
      this.gdv.names["typeName"].includes(typeName.toLowerCase()) &&
      typeName.toLowerCase() !== this.currentName.toLowerCase()
    ) {
      this.typeForm.controls["typeName"].setErrors({ incorrect: true });
    }
  }
}
