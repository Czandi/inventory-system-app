import { Subject } from "rxjs";

export class SubjectService {
  submenuEmitter = new Subject<any>();
  contextMenuEmitter = new Subject<any>();
  currentPageEmitter = new Subject<any>();
  sortValueEmitter = new Subject<any>();
  totalPageNumber = new Subject<any>();
  reloadAddRecordPageData = new Subject<any>();
}
