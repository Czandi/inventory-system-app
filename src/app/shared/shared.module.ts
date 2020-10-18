import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";

import { PageNotFoundComponent } from "./components/";
import { WebviewDirective } from "./directives/";
import { FormsModule } from "@angular/forms";

import { PaginationComponent } from "./components/pagination/pagination.component";
import { ContextMenuComponent } from "./components/context-menu/context-menu.component";

@NgModule({
  declarations: [
    PageNotFoundComponent,
    PaginationComponent,
    ContextMenuComponent,
    WebviewDirective,
  ],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    PaginationComponent,
    ContextMenuComponent,
  ],
})
export class SharedModule {}
