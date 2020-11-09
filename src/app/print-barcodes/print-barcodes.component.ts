import { Component, OnInit, ViewChild } from "@angular/core";
import { PrintableBarcodes } from "app/shared/printableBarcodes";
import { BarcodesGeneratorService } from "../core/services/barcodes-generator.service";

@Component({
  selector: "app-print-barcodes",
  templateUrl: "./print-barcodes.component.html",
  styleUrls: ["./print-barcodes.component.scss"],
})
export class PrintBarcodesComponent implements OnInit {
  @ViewChild("code") code;

  public barcodes;
  public source;

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private PAGE_SIZE = 20;
  private ROW_SIZE = 5;
  private COLUMN_SIZE = 4;
  private CANVAS_WIDTH = 800;
  private CANVAS_HEIGHT = 600;
  private ELEMENT_WIDTH = this.CANVAS_WIDTH / this.ROW_SIZE;
  private ELEMENT_HEIGHT = this.CANVAS_HEIGHT / this.COLUMN_SIZE;

  private currentPosX = 0;
  private currentPosY = 0;

  private barcode;

  constructor(private barcodeGeneratorService: BarcodesGeneratorService) {}

  ngOnInit(): void {
    this.barcodes = PrintableBarcodes.barcodes;
  }

  ngAfterViewInit() {
    this.canvasInit();

    let i = 0;
    for (let barcode of this.barcodes) {
      i++;
      this.updateCurrentXAndY(i);
      this.drawBarcodeAndData(barcode, this.currentPosX, this.currentPosY);
    }
  }

  updateCurrentXAndY(i) {
    if (i % 6 === 0) {
      this.currentPosY += 200;
      this.currentPosX = 0;
    } else if (i > 1) {
      this.currentPosX += 150;
    }
  }

  drawBarcodeAndData(barcode, x, y) {
    let barcodeImg = new Image();
    barcodeImg.src = this.barcodeGeneratorService.generateBarcode(
      barcode["barcode"]
    );

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
      this.drawText(barcode["serialNumber"], modelX, modelY);
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
  }

  drawText(text, x, y) {
    this.context.fillText(text, x, y);
  }
}
