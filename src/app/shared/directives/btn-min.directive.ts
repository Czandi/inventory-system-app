import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[btnMin]",
})
export class BtnMinDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.minWidth = "100px";
  }
}
