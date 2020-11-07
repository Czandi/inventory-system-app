export class PrintableBarcodes {
  private static _barcodes = [];

  public static addBarcode(barcode) {
    this._barcodes.push(barcode);
  }

  public static get barcodes() {
    return this._barcodes;
  }
}
