import { ModelService } from "app/core/services/model.service";
import { DeviceSetService } from "./../../core/services/device-set.service";
import { DeviceTypeService } from "./../../core/services/device-type.service";
import { RoomService } from "app/core/services/room.service";
import { OwnerService } from "app/core/services/owner.service";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceService } from "app/core/services/device.service";
import { PrintableBarcodes } from "../../shared/printableBarcodes";
import { Subscription } from "rxjs";
import { SubjectService } from "../../core/services/subject.service";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-display-records",
  templateUrl: "./display-records.component.html",
  styleUrls: ["./display-records.component.scss"],
})
export class DisplayRecordsComponent implements OnInit {
  @ViewChild("searchBar") searchBar: ElementRef;
  @ViewChild("device") deviceTableButton: ElementRef;
  @ViewChild("popup") popup;
  @ViewChild("alert") alert;
  @ViewChild("product") deviceElement;

  @ViewChild("product") productTable;
  @ViewChild("model") modelTable;
  @ViewChild("productSet") productSetTable;
  @ViewChild("productType") productTypeTable;
  @ViewChild("owner") ownerTable;
  @ViewChild("room") roomTable;

  public records = [];
  public totalPages: number;
  public currentPage = 1;
  public searchValue = "";
  public currentRoute;
  public blured = false;
  public deviceForm;
  public alertTitle: string = "PAGES.DISPLAY_RECORDS.DELETE_RECORD";
  public alertText: string;
  public activeTable;

  private deleteId;
  private search = "";
  private searchTimeout;
  private activeItem = null;
  private action = "";
  private tables;

  private routeSub: Subscription;
  private alertSub: Subscription;
  private subjectSub: Subscription;
  private typeServiceSub: Subscription;
  private setServiceSub: Subscription;
  private ownerServiceSub: Subscription;
  private roomServiceSub: Subscription;
  private deviceServiceSub: Subscription;
  private modelServiceSub: Subscription;

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService,
    private ownerService: OwnerService,
    private roomService: RoomService,
    private deviceTypeService: DeviceTypeService,
    private deviceSetService: DeviceSetService,
    private modelService: ModelService
  ) {}

  ngOnInit(): void {
    this.subjectService.totalPageNumber.subscribe((totalPages) => {
      this.totalPages = totalPages;
    }).unsubscribe;

    this.subjectSub = this.subjectService.activeTable.subscribe(
      (activeTable) => {
        console.log(activeTable);
        this.activeTable = activeTable;
        this.setActiveItem(this.tables[activeTable]);
      }
    );
  }

  ngAfterViewInit() {
    this.tables = {
      productTable: this.productTable.nativeElement,
      modelTable: this.modelTable.nativeElement,
      productTypeTable: this.productTypeTable.nativeElement,
      productSetTable: this.productSetTable.nativeElement,
      ownerTable: this.ownerTable.nativeElement,
      roomTable: this.roomTable.nativeElement,
    };

    this.routeSub = this.activatedRoute.queryParams.subscribe((params) => {
      if (params["edit"] !== undefined) {
        this.blured = true;
      } else {
        this.blured = false;
      }

      if (params["addBarcode"] !== undefined) {
        this.deleteId = params["addBarcode"];
        this.addBarcode();
      }

      if (params["deleteProduct"] !== undefined) {
        this.deleteId = params["deleteProduct"];
        this.alertText = "PAGES.DISPLAY_RECORDS.DELETE_PRODUCT_MESSAGE";
        this.action = "delete-product";
        this.alert.trigger();
      }

      if (params["deleteModel"] !== undefined) {
        if (+params["deleteModel"] === 0) {
          this.popup.triggerFailure();
        } else {
          this.deleteId = params["deleteModel"];
          this.alertText = "PAGES.DISPLAY_RECORDS.DELETE_MODEL_MESSAGE";
          this.action = "delete-model";
          this.alert.trigger();
        }
      }

      if (params["deleteOwner"] !== undefined) {
        if (+params["deleteOwner"] === 0) {
          this.popup.triggerFailure();
        } else {
          this.deleteId = params["deleteOwner"];
          this.alertText = "PAGES.DISPLAY_RECORDS.DELETE_OWNER_MESSAGE";
          this.action = "delete-owner";
          this.alert.trigger();
        }
      }

      if (params["deleteRoom"] !== undefined) {
        if (+params["deleteRoom"] === 0) {
          this.popup.triggerFailure();
        } else {
          this.deleteId = params["deleteRoom"];
          this.alertText = "PAGES.DISPLAY_RECORDS.DELETE_ROOM_MESSAGE";
          this.action = "delete-room";
          this.alert.trigger();
        }
      }

      if (params["deleteSet"] !== undefined) {
        if (+params["deleteSet"] === 0) {
          this.popup.triggerFailure();
        } else {
          this.deleteId = params["deleteSet"];
          this.alertText = "PAGES.DISPLAY_RECORDS.DELETE_SET_MESSAGE";
          this.action = "delete-set";
          this.alert.trigger();
        }
      }

      if (params["deleteModel"] !== undefined) {
        if (+params["deleteModel"] === 0) {
          this.popup.triggerFailure();
        } else {
          this.deleteId = params["deleteModel"];
          this.alertText = "PAGES.DISPLAY_RECORDS.DELETE_MODEL_MESSAGE";
          this.action = "delete-model";
          this.alert.trigger();
        }
      }

      if (params["deleteType"] !== undefined) {
        if (+params["deleteType"] === 0) {
          this.popup.triggerFailure();
        } else {
          this.deleteId = params["deleteType"];
          this.alertText = "PAGES.DISPLAY_RECORDS.DELETE_TYPE_MESSAGE";
          this.action = "delete-type";
          this.alert.trigger();
        }
      }

      if (params["page"] === undefined) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { page: 1 },
          queryParamsHandling: "merge",
        });
      }
    });

    this.alertSub = this.subjectService.alert.subscribe((accept) => {
      console.log(accept);
      if (accept) {
        switch (this.action) {
          case "delete-product":
            this.deleteRecord(this.deleteId);
            break;

          case "delete-model":
            this.deleteModel(this.deleteId);
            break;

          case "delete-owner":
            this.deleteOwner(this.deleteId);
            break;

          case "delete-room":
            this.deleteRoom(this.deleteId);
            break;

          case "delete-set":
            this.deleteSet(this.deleteId);
            break;

          case "delete-model":
            this.deleteModel(this.deleteId);
            break;

          case "delete-type":
            this.deleteType(this.deleteId);
            break;
        }
      }

      this.clearQueryParams();
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.alertSub.unsubscribe();
    this.subjectSub.unsubscribe();
    this.deviceServiceSub.unsubscribe();
    this.modelServiceSub.unsubscribe();
    this.ownerServiceSub.unsubscribe();
    this.roomServiceSub.unsubscribe();
    this.setServiceSub.unsubscribe();
    this.typeServiceSub.unsubscribe();
  }

  deleteRecord(id: number) {
    this.deviceServiceSub = this.deviceService
      .deleteDevice(id)
      .subscribe((device) => {});
  }

  deleteModel(id: number) {
    this.modelServiceSub = this.modelService
      .deleteModel(id)
      .subscribe((data) => {});
  }

  deleteOwner(id: number) {
    this.ownerServiceSub = this.ownerService
      .deleteOwner(id)
      .subscribe((data) => {});
  }

  deleteRoom(id: number) {
    this.roomServiceSub = this.roomService
      .deleteRoom(id)
      .subscribe((data) => {});
  }

  deleteSet(id: number) {
    this.setServiceSub = this.deviceSetService
      .deleteDeviceSet(id)
      .subscribe((data) => {});
  }

  deleteType(id: number) {
    this.typeServiceSub = this.deviceTypeService
      .deleteType(id)
      .subscribe((data) => {});
  }

  clearQueryParams() {
    this.router.navigate([], {
      queryParams: {
        deleteProduct: null,
        deleteModel: null,
        deleteOwner: null,
        deleteSet: null,
        deleteRoom: null,
        deleteType: null,
      },
      queryParamsHandling: "merge",
    });
  }

  addBarcode() {
    this.deviceService.getSingleDevice(this.deleteId).subscribe((device) => {
      let barcode = device["barCode"];
      let model = device["model"]["name"];
      let serialNumber = device["serialNumber"];
      let success = PrintableBarcodes.addBarcode(barcode, serialNumber, model);

      if (success) {
        this.popup.triggerSuccess();
      } else {
        this.popup.triggerFailure();
      }
    });
  }

  onTyping() {
    this.search =
      this.searchBar.nativeElement.value === "-"
        ? "null"
        : this.searchBar.nativeElement.value;
    this.resetSearchTimeout();
  }

  resetSearchTimeout() {
    window.clearTimeout(this.searchTimeout);
    this.searchTimeout = window.setTimeout(() => {
      this.searchValue = this.search;
      this.router.navigate([], {
        queryParams: { search: this.searchValue },
        queryParamsHandling: "merge",
      });
    }, 500);
  }

  updateRoute() {
    if (!this.router.url.includes("edit")) {
      this.router.navigate(["/display-records/" + this.currentRoute], {
        queryParams: { page: this.currentPage, search: this.searchValue },
      });
    }
  }

  setLink(link, element, emitter?) {
    if (emitter) {
      this.subjectService.activeTable.next(emitter);
    } else {
      this.setActiveItem(element);
    }
    this.router.navigate(["/display-records/" + link], {
      queryParams: { page: 1 },
    });
  }

  setActiveItem(element) {
    if (this.activeItem !== null) {
      this.activeItem.classList.remove("active");
    }
    this.activeItem = element;
    this.activeItem.classList.add("active");

    console.log(this.activeItem);
  }

  saveRecords() {
    this.router.navigate([], {
      queryParams: { save: true },
      queryParamsHandling: "merge",
    });
  }
}
