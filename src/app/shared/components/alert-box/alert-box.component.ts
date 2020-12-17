import { SubjectService } from "app/core/services/subject.service";
import { Component, ElementRef, OnInit } from "@angular/core";

@Component({
  selector: "app-alert",
  templateUrl: "./alert-box.component.html",
  styleUrls: ["./alert-box.component.scss"],
})
export class AlertBoxComponent implements OnInit {
  constructor(
    private host: ElementRef,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {}

  trigger() {
    this.host.nativeElement.classList.add("active");
  }

  closeAlert() {
    this.host.nativeElement.classList.remove("active");
    this.subjectService.alert.next(false);
  }

  accept() {
    this.host.nativeElement.classList.remove("active");
    this.subjectService.alert.next(true);
  }
}
