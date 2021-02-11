import { Observable, Subject } from "rxjs";

export class SubjectService {
  submenuEmitter = new Subject<any>();
  contextMenuEmitter = new Subject<any>();
  currentPageEmitter = new Subject<any>();
  sortValueEmitter = new Subject<any>();
  totalPageNumber = new Subject<any>();
  reloadAddRecordPageData = new Subject<any>();
  blur = new Subject<any>();
  alert = new Subject<any>();
  activeTable = new Subject<any>();
}
