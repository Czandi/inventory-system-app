export class Data {
  static getDeviceTableData() {
    return [
      { header: "TABLE_HEADERS.DEVICE.SERIAL_NUMBER", id: "serialNumber" },
      { header: "TABLE_HEADERS.DEVICE.DEVICE_MODEL", id: "model" },
      { header: "TABLE_HEADERS.DEVICE.DEVICE_TYPE", id: "type" },
      { header: "TABLE_HEADERS.DEVICE.ROOM", id: "room" },
      { header: "TABLE_HEADERS.DEVICE.OWNER", id: "owner" },
      { header: "TABLE_HEADERS.DEVICE.BAR_CODE", id: "barCode" },
      { header: "TABLE_HEADERS.DEVICE.SET_NUMBER", id: "setNumber" },
    ];
  }

  static getModelTableData() {
    return [
      { header: "TABLE_HEADERS.MODEL.MODEL_NAME", id: "name" },
      { header: "TABLE_HEADERS.MODEL.DEVICE_TYPE", id: "type" },
      { header: "TABLE_HEADERS.MODEL.AMOUNT", id: "count" },
    ];
  }

  static getDeviceSetTableData() {
    return [
      { header: "TABLE_HEADERS.DEVICE_SET.DEVICE_SET_NAME", id: "name" },
      { header: "TABLE_HEADERS.DEVICE_SET.DEVICES_AMOUNT", id: "count" },
    ];
  }

  static getDeviceTypeTableData() {
    return [
      { header: "TABLE_HEADERS.DEVICE_TYPE.DEVICE_TYPE_NAME", id: "name" },
      { header: "TABLE_HEADERS.DEVICE_TYPE.DEVICE_AMOUNT", id: "count" },
    ];
  }

  static getOwnerTableData() {
    return [
      { header: "TABLE_HEADERS.OWNER.OWNER_NAME", id: "name" },
      { header: "TABLE_HEADERS.OWNER.OWNER_SURNAME", id: "surname" },
      { header: "TABLE_HEADERS.OWNER.ITEMS_COUNT", id: "count" },
    ];
  }

  static getRoomTableData() {
    return [
      { header: "TABLE_HEADERS.ROOM.ROOM_NAME", id: "name" },
      { header: "TABLE_HEADERS.ROOM.ITEMS_IN_ROOM", id: "count" },
    ];
  }

  static getAddDeviceData() {
    return [
      { text: "TABLE_HEADERS.DEVICE.SERIAL_NUMBER", id: "serialNumber" },
      { text: "TABLE_HEADERS.DEVICE.DEVICE_MODEL", id: "deviceModel" },
      { text: "TABLE_HEADERS.DEVICE.DEVICE_TYPE", id: "deviceType" },
      { text: "TABLE_HEADERS.DEVICE.ROOM", id: "deviceRoom" },
      { text: "TABLE_HEADERS.DEVICE.OWNER", id: "deviceOwner" },
      { text: "TABLE_HEADERS.DEVICE.SET_NUMBER", id: "deviceSet" },
    ];
  }
}
