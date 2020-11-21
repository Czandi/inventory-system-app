import { Subscription } from "rxjs";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PrintableBarcodes } from "app/shared/printableBarcodes";
import { BarcodesGeneratorService } from "../core/services/barcodes-generator.service";
import html2canvas from "html2canvas";

@Component({
  selector: "app-print-barcodes",
  templateUrl: "./print-barcodes.component.html",
  styleUrls: ["./print-barcodes.component.scss"],
})
export class PrintBarcodesComponent implements OnInit {
  @ViewChild("code") code;
  // @ViewChild("barcodesContainer") barcodesContainer;
  // @ViewChild("canvas") canvasElement;
  // @ViewChild("donwloadLink") downloadLink;

  public barcodes = [];
  public downloadingBarcodes = [];
  public source;
  public currentPage;
  public totalPages;
  public barcodesSrc = [];

  private canvas;
  private downloadLink;
  private barcodesContainer;
  private context: CanvasRenderingContext2D;
  private mirror;

  private PAGE_SIZE = 20;
  private ROW_SIZE = 5;
  private COLUMN_SIZE = 4;
  private CANVAS_WIDTH = 800;
  private CANVAS_HEIGHT = 600;
  private ELEMENT_WIDTH = this.CANVAS_WIDTH / this.ROW_SIZE;
  private ELEMENT_HEIGHT = this.CANVAS_HEIGHT / this.COLUMN_SIZE;

  private currentPosX;
  private currentPosY;
  private allBarcodes;
  private barcode;

  private routeSub: Subscription;

  constructor(
    private barcodeGeneratorService: BarcodesGeneratorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.allBarcodes = PrintableBarcodes.barcodes;

    this.totalPages = Math.ceil(this.allBarcodes.length / this.PAGE_SIZE);
    this.currentPage = 1;

    this.routeSub = this.activatedRoute.queryParams.subscribe((params) => {
      if (params["page"] !== undefined && params["page"] !== this.currentPage) {
        this.currentPage = +params["page"];
        this.updatePage();
      }
    });

    this.updatePage();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  updatePage() {
    if (this.currentPage !== this.totalPages) {
      this.barcodes = this.allBarcodes.slice(
        (this.currentPage - 1) * this.PAGE_SIZE,
        (this.currentPage - 1) * this.PAGE_SIZE + this.PAGE_SIZE
      );
    } else {
      this.barcodes = this.allBarcodes.slice(
        (this.currentPage - 1) * this.PAGE_SIZE
      );
    }

    console.log(this.barcodes);
  }

  clearBarcodesList() {
    this.barcodes = [];
    PrintableBarcodes.clearBarcodes();
  }

  removeBarcode(barcode) {
    console.log(PrintableBarcodes.barcodes);
    PrintableBarcodes.removeBarcode(barcode);
    console.log(PrintableBarcodes.barcodes);
    this.updatePage();
  }

  saveBarcodesImgs() {
    this.savePage(0);
  }

  savePage(page) {
    if (page < this.totalPages - 1) {
      this.downloadingBarcodes = this.allBarcodes.slice(
        page * this.PAGE_SIZE,
        page * this.PAGE_SIZE + this.PAGE_SIZE
      );
    } else {
      this.downloadingBarcodes = this.allBarcodes.slice(page * this.PAGE_SIZE);
    }

    this.barcodesContainer = document.getElementById("barcodes-container");
    this.canvas = document.getElementById("canvas");
    this.downloadLink = document.getElementById("download-link");

    html2canvas(this.barcodesContainer).then((canvas) => {
      this.canvas.src = canvas.toDataURL("image/jpeg", 1.0);
      this.downloadLink.href = canvas.toDataURL("image/jpeg", 1.0);
      this.downloadLink.download = "barcodes-" + page + ".jpeg";

      if (page > 0) {
        this.downloadLink.click();
      }

      if (page !== this.totalPages) {
        this.savePage(++page);
      }
    });
  }

  drawText(text, x, y) {
    this.context.fillText(text, x, y, 110);
  }
}
