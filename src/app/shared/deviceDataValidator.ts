import { Device } from "./models/device.model";

export class DeviceDataValidator {
  private _ids: any = {};
  private _names: any = {};
  private _modelsWithTypes = [];
  private _newRecords = [];

  private newModelName;
  private newTypeName;
  private newRoomName;
  private newOwnerName;
  private newSetName;

  public insertIds(data, id) {
    this._ids[id] = [];
    for (let item of data) {
      let itemName = item["name"];
      let itemId = item["id"];
      this._ids[id][itemName] = itemId;
    }
  }

  public insertNames(data, id) {
    this._names[id] = [];
    for (let name of data) {
      let itemId = name["name"];
      if (itemId !== "null") {
        this._names[id].push(itemId);
      }
    }
  }

  public insertModelsWithTypes(data) {
    for (let record of data) {
      this._modelsWithTypes[record.name] = record.type.name;
    }
  }

  public getNameIdFromArray(name, id): number {
    if (this.checkIfNameExists(name, id)) {
      return this._ids[id][name];
    } else {
      return 0;
    }
  }

  public checkIfNameExists(name, id): boolean {
    if (this._ids[id][name] != null) {
      return true;
    }
    return false;
  }

  public validateDeviceData(device): boolean {
    this._newRecords = [];

    console.log(this._ids);
    console.log(this._names);

    if (!this.validateId(device.idRoom)) {
      this._newRecords.push({
        text: "TABLE_HEADERS.DEVICE.ROOM",
        name: this.newRoomName,
        type: "deviceRoom",
      });
    }

    if (!this.validateId(device.idModel)) {
      let idDeviceType: number = this.getNameIdFromArray(
        this.newTypeName,
        "deviceType"
      );
      this._newRecords.push({
        text: "TABLE_HEADERS.DEVICE.DEVICE_MODEL",
        name: this.newModelName,
        deviceTypeId: idDeviceType,
        deviceTypeName: this.newTypeName,
        type: "deviceModel",
      });
    }

    if (!this.validateId(device.idOwner)) {
      this._newRecords.push({
        text: "TABLE_HEADERS.DEVICE.OWNER",
        name: this.newOwnerName,
        type: "deviceOwner",
      });
    }

    if (!this.validateId(device.idDeviceSet)) {
      this._newRecords.push({
        text: "TABLE_HEADERS.DEVICE.SET_NUMBER",
        name: this.newSetName,
        type: "deviceSet",
      });
    }

    if (this._newRecords.length != 0) {
      return false;
    }

    return true;
  }

  validateId(data): boolean {
    if (data != null && data != "" && data != 0) return true;
    return false;
  }

  public createNewDevice(
    serialNumber,
    modelName,
    typeName,
    roomName,
    ownerName,
    setName,
    comment
  ) {
    this.newModelName = modelName;
    this.newTypeName = typeName;
    this.newRoomName = roomName;
    this.newOwnerName = ownerName;
    this.newSetName = setName;

    let device = new Device();
    device.serialNumber = serialNumber.toLowerCase();
    device.idModel = this.getNameIdFromArray(modelName, "deviceModel");
    device.idRoom = this.getNameIdFromArray(roomName, "deviceRoom");
    device.idOwner = this.getNameIdFromArray(ownerName, "deviceOwner");
    device.idDeviceSet = this.getNameIdFromArray(setName, "deviceSet");
    device.comment = comment.toLowerCase();

    return device;
  }

  public get ids() {
    return this._ids;
  }

  public get names() {
    return this._names;
  }

  public get modelsWithTypes() {
    return this._modelsWithTypes;
  }

  public get newRecords() {
    return this._newRecords;
  }
}
