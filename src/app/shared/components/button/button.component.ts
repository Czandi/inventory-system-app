import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() type: string;
  @Input() btnMin: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
