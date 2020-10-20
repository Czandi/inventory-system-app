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
      { header: "MODEL.MODEL_NAME", id: "name" },
      { header: "MODEL.DEVICE_TYPE", id: "type" },
      { header: "MODEL.AMOUNT", id: "count" },
    ];
  }

  static getDeviceSetTableData() {
    return [
      { header: "DEVICE_SET.DEVICE_SET_NAME", id: "name" },
      { header: "DEVICE_SET.DEVICES_AMOUNT", id: "count" },
    ];
  }

  static getDeviceTypeTableData() {
    return [
      { header: "DEVICE_TYPE.DEVICE_TYPE_NAME", id: "name" },
      { header: "DEVICE_TYPE.DEVICE_AMOUNT", id: "count" },
    ];
  }

  static getOwnerTableData() {
    return [
      { header: "OWNER.OWNER_NAME", id: "name" },
      { header: "OWNER.OWNER_SURNAME", id: "surname" },
      { header: "OWNER.ITEMS_COUNT", id: "count" },
    ];
  }

  static getRoomTableData() {
    return [
      { header: "ROOM.ROOM_NAME", id: "name" },
      { header: "ROOM.ITEMS_IN_ROOM", id: "count" },
    ];
  }
}
