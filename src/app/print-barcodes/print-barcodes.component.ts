import { Subscription } from "rxjs";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PrintableBarcodes } from "app/shared/printableBarcodes";
import { BarcodesGeneratorService } from "../core/services/barcodes-generator.service";

@Component({
  selector: "app-print-barcodes",
  templateUrl: "./print-barcodes.component.html",
  styleUrls: ["./print-barcodes.component.scss"],
})
export class PrintBarcodesComponent implements OnInit {
  @ViewChild("code") code;

  public barcodes = [];
  public source;
  public currentPage;
  public totalPages;
  public barcodesSrc = [];

  private canvas: HTMLCanvasElement;
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

    this.allBarcodes = [
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Spc Gear gk 550 ",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Spc Gear gk 550 Xiaomi",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
      {
        barcode: "4201120",
        serialNumber: "fgl134a",
        model: "Xiaomi mi9",
      },
    ];

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
        this.PAGE_SIZE
      );
    } else {
      this.barcodes = this.allBarcodes.slice(
        (this.currentPage - 1) * this.PAGE_SIZE
      );
    }

    this.currentPosX = 0;
    this.currentPosY = 0;

    this.updateCavnasAndLoadImages();
  }

  updateCavnasAndLoadImages() {
    this.canvasInit();
    let i = 0;
    for (let barcode of this.barcodes) {
      this.barcodesSrc[
        barcode["barcode"]
      ] = this.barcodeGeneratorService.generateBarcode(barcode["barcode"]);
      this.updateCurrentXAndY(i);
      this.drawBarcodeAndData(barcode, this.currentPosX, this.currentPosY);
      i++;
    }
  }

  updateCurrentXAndY(i) {
    if (i % 5 === 0 && i > 0) {
      this.currentPosY += this.ELEMENT_HEIGHT;
      this.currentPosX = 0;
    } else if (i > 0) {
      this.currentPosX += this.ELEMENT_WIDTH;
    }
  }

  drawBarcodeAndData(barcode, x, y) {
    let barcodeImg = new Image();
    barcodeImg.src = this.barcodesSrc[barcode["barcode"]];

    barcodeImg.onload = () => {
      let barcodeImageX = x + this.ELEMENT_WIDTH / 2 - barcodeImg.width / 2;
      let barcodeImageY = y + this.ELEMENT_HEIGHT / 2 - barcodeImg.height / 2;
      let modelY = y + (this.ELEMENT_HEIGHT - barcodeImg.height) / 2 - 5.5;
      let modelX = x + this.ELEMENT_WIDTH / 2;
      let barcodeY =
        y +
        this.ELEMENT_HEIGHT -
        (this.ELEMENT_HEIGHT - barcodeImg.height) / 2 +
        16.5;
      let barcodeX = x + this.ELEMENT_WIDTH / 2;
      this.drawText(barcode["barcode"], barcodeX, barcodeY);
      this.drawText(barcode["model"], modelX, modelY);
      // barcodeImg.crossOrigin = "Anonymous";
      this.context.drawImage(barcodeImg, barcodeImageX, barcodeImageY);
    };
  }

  canvasInit() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");
    this.canvas.width = this.CANVAS_WIDTH;
    this.canvas.height = this.CANVAS_HEIGHT;
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.context.textAlign = "center";
    this.context.font = "11px Montserrat";
    this.context.fillStyle = "black";

    // console.log("Canvas width: " + this.canvas.width);
    // console.log("Canvas height: " + this.canvas.height);
    // console.log("Element width: " + this.ELEMENT_WIDTH);
    // console.log("Element height: " + this.ELEMENT_HEIGHT);
  }

  ngAfterViewInit() {
    this.mirror = document.getElementById("mirror");
    this.mirror.style.height = this.CANVAS_HEIGHT + "px";
    this.mirror.style.width = this.CANVAS_WIDTH + "px";
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
    var image = this.canvas.toDataURL("image/png");
    this.mirror.src = image;
    // console.log(image);
    // window.location.href = image;
  }

  drawText(text, x, y) {
    this.context.fillText(text, x, y, 110);
  }
}
