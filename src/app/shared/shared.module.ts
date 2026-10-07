import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ConditionComponent } from "./condition-component";
import { LoadingComponent } from './loading/loading.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [
    ConditionComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    ConditionComponent,
    LoadingComponent
  ]
})
export class SharedModule {}
