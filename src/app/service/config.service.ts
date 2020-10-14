export class ConfigService {
  private apiUrl = "http://localhost:4201";
  private _deviceUrl = this.apiUrl + "/devices/?page=2";
  private _roomUrl = this.apiUrl + "/rooms";

  get deviceUrl(): string {
    return this._deviceUrl;
  }

  get roomUrl(): string {
    return this._roomUrl;
  }
}
