import { Component, Input, OnInit } from "@angular/core";
import { SubmenuService } from "app/core/services/SubmenuService";

@Component({
  selector: "app-subnavbar",
  templateUrl: "./subnavbar.component.html",
  styleUrls: ["./subnavbar.component.scss"],
})
export class SubnavbarComponent implements OnInit {
  @Input() items;

  constructor(private service: SubmenuService) {}

  ngOnInit(): void {
    this.service.evenets$.forEach((event) => console.log(event));
  }
}
