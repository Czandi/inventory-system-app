import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[btnFull]",
})
export class BtnFullDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.minWidth = "100%";
  }
}
