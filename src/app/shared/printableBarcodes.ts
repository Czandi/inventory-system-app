export class PrintableBarcodes {
  private static _allBarcodesWithData = [];
  private static barcodesArray = [];

  public static addBarcode(barcode, serialNumber, model) {
    let newBarcode = {
      barcode: barcode,
      serialNumber: serialNumber,
      model: model,
    };
    this.barcodesArray.push(barcode);
    this._allBarcodesWithData.push(newBarcode);
    return true;

    // if (this.barcodesArray.indexOf(barcode) === -1) {
    //   let newBarcode = {
    //     barcode: barcode,
    //     serialNumber: serialNumber,
    //     model: model,
    //   };
    //   this.barcodesArray.push(barcode);
    //   this._allBarcodesWithData.push(newBarcode);
    //   return true;
    // } else {
    //   return false;
    // }
  }

  public static clearBarcodes() {
    this._allBarcodesWithData = [];
    this.barcodesArray = [];
  }

  public static removeBarcode(barcode) {
    let index = this._allBarcodesWithData.indexOf(barcode);
    if (index !== -1) {
      this._allBarcodesWithData.splice(index, 1);
    }
  }

  public static get barcodes() {
    return this._allBarcodesWithData;
  }
}
