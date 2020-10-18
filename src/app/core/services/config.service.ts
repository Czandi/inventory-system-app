export class ConfigService {
  private apiUrl = "http://localhost:4201";
  private _deviceUrl = this.apiUrl + "/devices";
  private _modelUrl = this.apiUrl + "/models";
  private _roomUrl = this.apiUrl + "/rooms";

  private _page = "/?page=";
  private _sortType = "&sortType=";
  private _orderBy = "&orderBy=";
  private _search = "&search=";

  get deviceUrl(): string {
    return this._deviceUrl;
  }

  get modelUrl(): string {
    return this._modelUrl;
  }

  get roomUrl(): string {
    return this._roomUrl;
  }

  get page(): string {
    return this._page;
  }

  get sortType(): string {
    return this._sortType;
  }

  get orderBy(): string {
    return this._orderBy;
  }

  get search(): string {
    return this._search;
  }
}
