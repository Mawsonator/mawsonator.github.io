import { LayoutModule } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input"
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RemoveCalcPipe } from "../shared/remove-calc.pipe";
import { CollectionComponent } from "./collection.component";
import { CollectionDetailComponent } from './collection-detail.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    CollectionComponent,
    RemoveCalcPipe,
    CollectionDetailComponent
  ],
  imports:[
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    RouterModule.forChild([
      { path: 'collection', component: CollectionComponent},
      { path: 'collection/:id', component: CollectionDetailComponent}
    ]),
    SharedModule
  ]
})
export class CollectionModule {}