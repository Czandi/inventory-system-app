import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { SubjectService } from "../../service/subjectService";
import { ContextMenu } from "../../shared/models/context-menu.model";

@Component({
  selector: "app-context-menu",
  templateUrl: "./context-menu.component.html",
  styleUrls: ["./context-menu.component.scss"],
})
export class ContextMenuComponent implements OnInit {
  @ViewChild("contextMenu") contextMenu: ElementRef;

  constructor(
    private subjectService: SubjectService,
    private renderer: Renderer2,
    private hostElement: ElementRef
  ) {}

  ngOnInit(): void {
    this.subjectService.contextMenuEmitter.subscribe((event) => {
      if (event instanceof ContextMenu) {
        var contextMenu = this.hostElement.nativeElement;
        this.renderer.setStyle(contextMenu, "top", event.mouseY - 30 + "px");
        this.renderer.setStyle(contextMenu, "left", event.mouseX - 120 + "px");
        this.renderer.setStyle(contextMenu, "display", "block");
      }
    });
  }

  @HostListener("document:click", ["$event"])
  click(event) {
    var contextMenu = this.hostElement.nativeElement;
    if (!this.hostElement.nativeElement.contains(event.target)) {
      this.renderer.setStyle(contextMenu, "display", "none");
      this.subjectService.contextMenuEmitter.next("closed");
    }
  }
}
