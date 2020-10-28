import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";

import { PageNotFoundComponent } from "./components/";
import { WebviewDirective } from "./directives/";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { PaginationComponent } from "./components/pagination/pagination.component";
import { ContextMenuComponent } from "./components/context-menu/context-menu.component";
import { ButtonComponent } from "./components/button/button.component";
import { BtnMinDirective } from "./directives/btn-min.directive";
import { BtnFullDirective } from "./directives/btn-full.directive";

@NgModule({
  declarations: [
    PageNotFoundComponent,
    PaginationComponent,
    ContextMenuComponent,
    WebviewDirective,
    ButtonComponent,
    BtnMinDirective,
    BtnFullDirective,
  ],
  imports: [CommonModule, TranslateModule, FormsModule, RouterModule],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    PaginationComponent,
    ContextMenuComponent,
    ButtonComponent,
    BtnMinDirective,
    BtnFullDirective,
  ],
})
export class SharedModule {}
