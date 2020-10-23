export class Device {
  serialNumber: number;
  idRoom: number;
  idModel: number;
  idOwner: number;
  idDeviceSet: number;
  comment: string;

  public Device(
    serialNumber: number,
    idRoom: number,
    idModel: number,
    idOwner: number,
    idDeviceSet: number,
    comment: string
  ) {
    this.serialNumber = serialNumber;
    this.idModel = idModel;
    this.idRoom = idRoom;
    this.idOwner = idOwner;
    this.idDeviceSet = idDeviceSet;
    this.comment = comment;
  }
}
