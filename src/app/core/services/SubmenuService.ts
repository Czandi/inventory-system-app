import { Subject } from "rxjs";

export class SubmenuService {
  private _subject = new Subject<any>();

  newEvent(event) {
    this._subject.next(event);
  }

  get evenets$() {
    return this._subject.asObservable();
  }
}
