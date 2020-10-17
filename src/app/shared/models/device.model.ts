// import { DevicesSet } from "./deviceSet.model";
// import { Model } from "./model.model";
// import { Owner } from "./owner.model";
// import { Room } from "./room.model";
// import { DeviceType } from "./type.model";

// export class Device {
//   constructor(
//     private _id: number,
//     private _serialNumber: number,
//     private _room: Room,
//     private _model: Model,
//     private _owner: Owner,
//     private _type: DeviceType,
//     private _setNumber: DevicesSet,
//     private _barCode: number,
//     private _comments: string,
//     private _createdDate: Date
//   ) {
//     this.id = _id;
//     this.serialNumber = _serialNumber;
//     this.room = _room;
//     this.model = _model;
//     this.owner = _owner;
//     this.type = _type;
//     this.setNumber = _setNumber;
//     this.barCode = _barCode;
//     this.comments = _comments;
//     this.createdDate = _createdDate;
//   }

//   public get createdDate(): Date {
//     return this._createdDate;
//   }
//   public set createdDate(value: Date) {
//     this._createdDate = value;
//   }
//   public get comments(): string {
//     return this._comments;
//   }
//   public set comments(value: string) {
//     this._comments = value;
//   }
//   public get barCode(): number {
//     return this._barCode;
//   }
//   public set barCode(value: number) {
//     this._barCode = value;
//   }
//   public get serialNumber(): number {
//     return this._serialNumber;
//   }
//   public get setNumber(): DevicesSet {
//     return this._setNumber;
//   }
//   public set setNumber(value: DevicesSet) {
//     this._setNumber = value;
//   }
//   public get type(): DeviceType {
//     return this._type;
//   }
//   public set type(value: DeviceType) {
//     this._type = value;
//   }
//   public get owner(): Owner {
//     return this._owner;
//   }
//   public set owner(value: Owner) {
//     this._owner = value;
//   }
//   public get model(): Model {
//     return this._model;
//   }
//   public set model(value: Model) {
//     this._model = value;
//   }
//   public get room(): Room {
//     return this._room;
//   }
//   public set room(value: Room) {
//     this._room = value;
//   }
//   public set serialNumber(value: number) {
//     this._serialNumber = value;
//   }
//   public get id(): number {
//     return this._id;
//   }
//   public set id(value: number) {
//     this._id = value;
//   }
// }

//     private _id: number,
//     private _serialNumber: number,
//     private _room: Room,
//     private _model: Model,
//     private _owner: Owner,
//     private _type: DeviceType,
//     private _setNumber: DevicesSet,
//     private _barCode: number,
//     private _comments: string,
//     private _createdDate: Date
export class Device {
  id: number;
  serialNumber: number;
  room: string;
  model: string;
  owner: string;
  type: string;
  setNumber: string;
  barCode: number;
  comments: string;
  createdDate: Date;
}
