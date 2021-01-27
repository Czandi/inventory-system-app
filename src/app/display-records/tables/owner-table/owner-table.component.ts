import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OwnerService } from "../../../core/services/owner.service";
import { SubjectService } from "../../../core/services/subject.service";
import { Table } from "../table.class";
import { Data } from "../../../shared/data";
import { GlobalDataValidator } from "app/shared/globalDataValidator";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-owner-table",
  templateUrl: "./owner-table.component.html",
  styleUrls: ["../table.scss"],
})
export class OwnerTableComponent extends Table implements OnInit {
  @ViewChild("name") serialNumberArrow: ElementRef;

  public tableData = [];
  public owners;
  public ownerForm;

  private gdv;
  private currentName;

  constructor(
    subjectService: SubjectService,
    activatedRoute: ActivatedRoute,
    router: Router,
    private ownerService: OwnerService
  ) {
    super(subjectService, activatedRoute, router, "name", "asc", [
      { name: "EDIT", action: "edit" },
      { name: "DELETE", action: "delete-owner" },
    ]);

    this.gdv = new GlobalDataValidator();
  }

  ngOnInit() {
    this.tableData = Data.getOwnerTableData();
    this.initFormGroup();
    this.initialize();
  }

  ngAfterViewInit() {
    this.currentArrow = document.getElementById("name");
    this.currentArrow.classList.add("active");
  }

  initFormGroup() {
    this.ownerForm = new FormGroup({
      ownerName: new FormControl("", Validators.required),
      ownerCount: new FormControl("", Validators.required),
    });
  }

  getAutoCompleteData() {
    this.ownerService.getAllOwners().subscribe((data) => {
      this.gdv.insertNames(data, "ownerName");
      this.gdv.insertIds(data, "ownerName");
    });
  }

  getRecords() {
    this.apiSub = this.ownerService
      .getAllOwnersWithDevicesCount(
        this.currentPage,
        this.sort.value,
        this.sort.type,
        this.searchValue
      )
      .subscribe((data) => {
        this.owners = data.content;
        this.subjectService.totalPageNumber.next(data.totalPages);
      });
  }

  updateInputValue() {
    this.ownerService.getSingleOwner(this.editedRecord).subscribe((owner) => {
      let ownerName = owner["name"];
      let ownerCount = owner["itemsCount"];

      this.currentName = ownerName;

      this.ownerForm.controls["ownerName"].setValue(ownerName);
      this.ownerForm.controls["ownerCount"].setValue(ownerCount);
    });
  }

  validateData() {
    let newOwnerName = this.ownerForm.get("ownerName").value.toLowerCase();

    if (this.ownerForm.valid) {
      if (!this.ownerExists(newOwnerName)) {
        this.updateRecordAndRedirect(newOwnerName);
      } else if (this.currentName === newOwnerName) {
        this.navigateAfterUpdateRecord();
      }
    }

    this.navigateAfterUpdateRecord();
  }

  updateRecordAndRedirect(record) {
    this.ownerService.updateOwner(this.editedRecord, record).subscribe(() => {
      this.navigateAfterUpdateRecord();
    });
  }

  ownerExists(name) {
    if (this.gdv.names[name]) {
      return true;
    } else {
      return false;
    }
  }

  checkIfNameExists() {
    let ownerName = this.ownerForm.get("ownerName").value.toLowerCase();
    if (
      this.gdv.names["ownerName"].includes(ownerName.toLowerCase()) &&
      ownerName.toLowerCase() !== this.currentName.toLowerCase()
    ) {
      this.ownerForm.controls["ownerName"].setErrors({ incorrect: true });
    }
  }
}
