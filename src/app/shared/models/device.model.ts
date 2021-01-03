export class Device {
  serialNumber: string;
  idRoom: number;
  idModel: number;
  idOwner: number;
  idDeviceSet: number;
  comment: string;
  id: number;

  public Device(
    serialNumber: string,
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
    this.id = 0;
  }
}
