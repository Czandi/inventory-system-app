import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { SubjectService } from "../../../core/services/subject.service";
import { ContextMenu } from "../../models/context-menu.model";

@Component({
  selector: "app-context-menu",
  templateUrl: "./context-menu.component.html",
  styleUrls: ["./context-menu.component.scss"],
})
export class ContextMenuComponent implements OnInit {
  @ViewChild("contextMenu") contextMenu: ElementRef;

  public options;

  private recordId;
  private open = false;
  private contextMenuOptions;

  constructor(
    private subjectService: SubjectService,
    private renderer: Renderer2,
    private hostElement: ElementRef
  ) {}

  ngOnInit(): void {
    this.subjectService.contextMenuEmitter.subscribe((event) => {
      if (event instanceof ContextMenu) {
        var contextMenu = this.hostElement.nativeElement;
        this.renderer.setStyle(contextMenu, "top", event.mouseY + "px");
        this.renderer.setStyle(contextMenu, "left", event.mouseX - 320 + "px");
        this.renderer.setStyle(contextMenu, "display", "block");
        this.contextMenuOptions = event.options;
        this.recordId = event.recordId;
        this.setOptions();
        setTimeout(() => {
          this.open = true;
        }, 50);
      }
    });
  }

  setOptions() {
    this.options = [];
    for (let option of this.contextMenuOptions) {
      let name = option.name;
      this.options.push({ name: name, param: this.getQueryParam(option) });
    }
  }

  getQueryParam(option) {
    let param;

    switch (option.action) {
      case "edit":
        param = { edit: this.recordId };
        break;

      case "delete-product":
        param = { deleteProduct: this.recordId };
        break;

      case "delete-model":
        param = { deleteModel: this.recordId };
        break;

      case "delete-owner":
        param = { deleteOwner: this.recordId };
        break;

      case "delete-room":
        param = { deleteRoom: this.recordId };
        break;

      case "delete-type":
        param = { deleteType: this.recordId };
        break;

      case "delete-set":
        param = { deleteSet: this.recordId };
        break;

      case "display":
        param = { table: option.table, display: this.recordId };
        break;

      case "addBarcode":
        param = { addBarcode: this.recordId };
        break;
      default:
        param = {};
    }

    return param;
  }

  @HostListener("document:click", ["$event"])
  onLeftClick(event) {
    var contextMenu = this.hostElement.nativeElement;
    if (this.open) {
      this.renderer.setStyle(contextMenu, "display", "none");
      this.subjectService.contextMenuEmitter.next("closed");
      this.open = false;
    }
  }
}
