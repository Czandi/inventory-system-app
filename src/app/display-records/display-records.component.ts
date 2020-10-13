import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DeviceService } from "../service/device.service";
import { Device } from "../shared/models/device.model";

@Component({
  selector: "app-display-records",
  templateUrl: "./display-records.component.html",
  styleUrls: ["./display-records.component.scss"],
})
export class DisplayRecordsComponent implements OnInit {
  devices = [];
  itemOnPage = 10;

  constructor(private router: Router, private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.getAllDevices().subscribe((data) => {
      this.devices = data;
      console.log(data);
    });
    // this.devices = this.deviceService.getAllDevices();
  }

  onRightClick(event, id: number) {
    console.log(event);
    console.log(id);
  }
}
