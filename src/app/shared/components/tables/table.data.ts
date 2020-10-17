export class TableData {
  static getDeviceTableData() {
    return [
      { header: "DEVICE.SERIAL_NUMBER", id: "serialNumber" },
      { header: "DEVICE.DEVICE_MODEL", id: "model" },
      { header: "DEVICE.DEVICE_TYPE", id: "type" },
      { header: "DEVICE.ROOM", id: "room" },
      { header: "DEVICE.OWNER", id: "owner" },
      { header: "DEVICE.BAR_CODE", id: "barCode" },
      { header: "DEVICE.SET_NUMBER", id: "setNumber" },
    ];
  }

  static getModelTableData() {
    return [
      { header: "MODEL.MODEL_NAME", id: "modelName" },
      { hedaer: "MODEL.DEVICE_TYPE", id: "deviceType" },
      { hedaeer: "MODEL.AMOUNT", id: "amount" },
    ];
  }
}
