import { Component, Input, OnInit } from "@angular/core";
import { SubjectService } from "../../../core/services/subject.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-subnavbar",
  templateUrl: "./subnavbar.component.html",
  styleUrls: ["./subnavbar.component.scss"],
})
export class SubnavbarComponent implements OnInit {
  @Input() items;
  @Input() elementId;

  isOpen = true;
  activeId: string;
  activeItems: Array<string> = [];
  static activeItems: Array<string> = [];

  private OFFSET = 50;
  private static lastItemIndex = null;
  private static lastRoute = null;

  constructor(private service: SubjectService, private router: Router) {}
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
      let item = this.items[i].item;
      let route = this.items[i].route;

      let itemTimeout = timeout + this.OFFSET * (+i + 1);

      this.ejectItem(item, itemTimeout);

      if (SubnavbarComponent.lastItemIndex === null && +i === 0) {
        this.firstActivateItem(item, itemTimeout);

        this.router.navigate([route]);

        this.setStaticVariables(0, route);
      } else if (+i === SubnavbarComponent.lastItemIndex) {
        this.firstActivateItem(item, itemTimeout);

        this.router.navigate([SubnavbarComponent.lastRoute]);
      }
    }
  }

  firstActivateItem(item, timeout) {
    setTimeout(() => {
      document.getElementById(item).classList.add("active");
    }, timeout);
  }

  hideCurrentEjectedItems() {
    for (let i in this.activeItems) {
      let timeout = this.OFFSET * +i;

      this.hideItem(timeout);
    }
    this.clearActiveItem();
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

  activateItem(item, route) {
    this.clearActiveItem();
    let itemElement = document.getElementById(item);
    itemElement.classList.add("active");
    let indexOfItem = this.activeItems.indexOf(item);
    this.setStaticVariables(indexOfItem, route);
  }

  clearActiveItem() {
    for (let item of this.activeItems) {
      document.getElementById(item).classList.remove("active");
    }
  }

  setStaticVariables(indexOfItem, route) {
    SubnavbarComponent.lastItemIndex = indexOfItem;
    SubnavbarComponent.lastRoute = route;
  }
}
