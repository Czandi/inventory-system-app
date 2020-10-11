import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DeviceService } from "../shared/device/device.service";

@Component({
  selector: "app-display-records",
  templateUrl: "./display-records.component.html",
  styleUrls: ["./display-records.component.scss"],
})
export class DisplayRecordsComponent implements OnInit {
  devices: Array<any>;

  constructor(private router: Router, private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.getAll().subscribe((data) => {
      this.devices = data;
    });
  }
}
