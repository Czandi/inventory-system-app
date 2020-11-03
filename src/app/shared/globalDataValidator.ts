export class GlobalDataValidator {
  private _ids: any = {};
  private _names: any = {};
  private _modelsWithTypes = [];

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
      this._names[id].push(itemId);
    }
  }

  public insertModelsWithTypes(data) {
    for (let record of data) {
      this._modelsWithTypes[record.name] = record.type.name;
    }
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
}
