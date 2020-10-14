import { Subject } from "rxjs";

export class SubjectService {
  submenuEmitter = new Subject<any>();
  contextMenuEmitter = new Subject<any>();
}
