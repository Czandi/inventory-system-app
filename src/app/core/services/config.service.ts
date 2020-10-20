export class ConfigService {
  private apiUrl = "http://localhost:4201";
  private _deviceUrl = this.apiUrl + "/devices";
  private _modelUrl = this.apiUrl + "/models";
  private _deviceSetUrl = this.apiUrl + "/devicesets";
  private _roomUrl = this.apiUrl + "/rooms";

  private PAGE_SIZE = 10;

  private _page = "?page=";
  private _page_size = "&pageSize=" + this.PAGE_SIZE;
  private _sortType = "&sortType=";
  private _orderBy = "&orderBy=";
  private _search = "&search=";

  get deviceUrl(): string {
    return this._deviceUrl;
  }

  get modelUrl(): string {
    return this._modelUrl;
  }

  get deviceSetUrl(): string {
    return this._deviceSetUrl;
  }

  get roomUrl(): string {
    return this._roomUrl;
  }

  get page(): string {
    return this._page;
  }

  get pageSize(): string {
    return this._page_size;
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
