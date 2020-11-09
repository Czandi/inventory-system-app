export class PrintableBarcodes {
  private static _allBarcodesWithData = [];
  private static barcodesArray = [];

  public static addBarcode(barcode, serialNumber, model) {
    console.log(this.barcodesArray.indexOf(barcode));

    if (this.barcodesArray.indexOf(barcode) === -1) {
      let newBarcode = {
        barcode: barcode,
        serialNumber: serialNumber,
        model: model,
      };
      this.barcodesArray.push(barcode);
      this._allBarcodesWithData.push(newBarcode);
      return true;
    } else {
      return false;
    }
  }

  public static get barcodes() {
    return this._allBarcodesWithData;
  }
}
