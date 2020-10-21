import { Component, Input, OnInit } from "@angular/core";
import { SubjectService } from "../../../core/services/subjectService";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { ThrowStmt } from "@angular/compiler";
import { CombineLatestOperator } from "rxjs/internal/observable/combineLatest";
import { Subscription } from "rxjs";
import { time } from "console";

@Component({
  selector: "app-subnavbar",
  templateUrl: "./subnavbar.component.html",
  styleUrls: ["./subnavbar.component.scss"],
  animations: [
    trigger("openClose", [
      // ...
      state(
        "closed",
        style({
          marginLeft: "-200px",
        })
      ),
      state(
        "open",
        style({
          marginLeft: "0",
        })
      ),
      transition("open => closed", [animate("0.4s ease")]),
      transition("closed => open", [animate("0.4s 200ms ease")]),
    ]),
  ],
})
export class SubnavbarComponent implements OnInit {
  @Input() items;
  @Input() elementId;

  isOpen = true;
  activeId: string;
  activeItems: Array<string> = [];
  static activeItems: Array<string> = [];

  private OFFSET = 50;

  constructor(private service: SubjectService) {}
  ngOnInit(): void {
    this.service.submenuEmitter.subscribe((event) => {
      this.hideCurrentEjectedItems();

      var timeout = this.OFFSET * this.items.length;

      this.delayItem(event, timeout);

      if (event === this.elementId) {
        this.triggerOpenAnimate(timeout);
      }
    });
  }

  delayItem(event, timeout) {
    setTimeout(() => {
      this.activeId = event;
    }, timeout);
  }

  triggerOpenAnimate(timeout: number) {
    for (let i in this.items) {
      let item = this.items[i];

      let itemTimeout = timeout + this.OFFSET * (+i + 1);

      this.ejectItem(item, itemTimeout);
    }
  }

  hideCurrentEjectedItems() {
    for (let i in this.activeItems) {
      let timeout = this.OFFSET * +i;

      this.hideItem(timeout);
    }
  }

  ejectItem(item, timeout) {
    setTimeout(() => {
      this.activeItems.push(item);
    }, timeout);
  }

  hideItem(timeout) {
    setTimeout(() => {
      this.activeItems.splice(0, 1);
    }, timeout);
  }
}
