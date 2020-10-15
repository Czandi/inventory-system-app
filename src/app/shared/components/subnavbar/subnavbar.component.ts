import { Component, Input, OnInit } from "@angular/core";
import { SubjectService } from "../../../service/subjectService";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { ThrowStmt } from "@angular/compiler";

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

  constructor(private service: SubjectService) {}

  ngOnInit(): void {
    this.service.submenuEmitter.subscribe((event) => {
      this.triggerAnimate("close", 0);
      var primaryTimeout = 50 * this.items.length + 1;
      setTimeout(() => {
        this.activeId = event;
      }, primaryTimeout);
      this.triggerAnimate("open", primaryTimeout);
    });
  }

  triggerAnimate(state: string, primaryTimout: number) {
    if (state === "open") {
      for (let i in this.items) {
        setTimeout(() => {
          this.activeItems.push(this.items[+i]);
        }, primaryTimout + 50 * (+i + 1));
      }
    } else if (state === "close" && this.activeItems != []) {
      this.activeItems.splice(0, 1);
      for (let i in this.activeItems) {
        setTimeout(() => {
          this.activeItems.splice(0, 1);
        }, 50 * (+i + 1));
      }
    }
  }
}
