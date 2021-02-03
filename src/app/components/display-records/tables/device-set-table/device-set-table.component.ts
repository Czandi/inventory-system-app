import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceSetService } from "app/core/services/device-set.service";
import { SubjectService } from "../../../../core/services/subject.service";
import { Table } from "../table.class";
import { Data } from "../../../../shared/data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GlobalDataValidator } from "app/shared/globalDataValidator";
import { DeviceSet } from "app/shared/models/deviceSet.model";

@Component({
  selector: "app-device-set-table",
  templateUrl: "./device-set-table.component.html",
  styleUrls: ["../table.scss"],
})
export class DeviceSetTableComponent extends Table implements OnInit {
  @ViewChild("name") serialNumberArrow: ElementRef;

  public tableData = [];
  public deviceSets;
  public setForm;

  private gdv;
  private currentName;

  constructor(
    subjectService: SubjectService,
    activatedRoute: ActivatedRoute,
    router: Router,
    private deviceSetService: DeviceSetService
  ) {
    super(subjectService, activatedRoute, router, "name", "asc", [
      { name: "EDIT", action: "edit" },
      // { name: "DELETE", action: "delete" },
    ]);

    this.gdv = new GlobalDataValidator();
  }

  ngOnInit(): void {
    this.tableData = Data.getDeviceSetTableData();
    this.initFormGroup();
    this.initialize();
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("name");
    this.currentArrow.classList.add("active");
  }

  initFormGroup() {
    this.setForm = new FormGroup({
      setName: new FormControl("", Validators.required),
      setCount: new FormControl("", Validators.required),
    });
  }

  getAutoCompleteData() {
    this.deviceSetService.getAllDeviceSets().subscribe((data) => {
      this.gdv.insertNames(data, "setName");
      this.gdv.insertIds(data, "setName");
    });
  }

  getRecords() {
    this.apiSub = this.deviceSetService
      .getAllDeviceSetsWithDevicesCount(
        this.currentPage,
        this.sort.value,
        this.sort.type,
        this.searchValue
      )
      .subscribe((data) => {
        this.deviceSets = data.content;
        this.subjectService.totalPageNumber.next(data.totalPages);
      });
  }

  validateData() {
    let newSetName = this.setForm.get("setName").value.toLowerCase();

    if (this.setForm.valid) {
      if (!this.setExists(newSetName)) {
        this.updateRecordAndRedirect(newSetName);
      } else if (this.currentName === newSetName) {
        this.navigateAfterUpdateRecord();
      } else {
      }
    }

    this.navigateAfterUpdateRecord();
  }

  updateRecordAndRedirect(record) {
    this.deviceSetService
      .updateDeviceSet(this.editedRecord, record)
      .subscribe((data) => {
        console.log(data);
        this.navigateAfterUpdateRecord();
      });
  }

  updateInputValue() {
    this.deviceSetService
      .getSingleDeviceSet(this.editedRecord)
      .subscribe((deviceSet) => {
        let setName = deviceSet["name"];
        let setCount = deviceSet["count"];

        this.currentName = setName;

        this.setForm.controls["setName"].setValue(setName);
        this.setForm.controls["setCount"].setValue(setCount);
      });
  }

  setExists(setName) {
    if (this.gdv.names[setName]) {
      return true;
    } else {
      return false;
    }
  }

  checkIfNameExists() {
    let setName = this.setForm.get("setName").value.toLowerCase();
    if (
      this.gdv.names["setName"].includes(setName) &&
      setName !== this.currentName
    ) {
      this.setForm.controls["setName"].setErrors({ incorrect: true });
    }
  }
}
