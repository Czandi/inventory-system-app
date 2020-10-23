import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-record",
  templateUrl: "./add-record.component.html",
  styleUrls: ["./add-record.component.scss"],
})
export class AddRecordComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}
}
