import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ICondition } from "../collection/condition";

@Component({
    selector: 'calc-condition',
    templateUrl: './condition-component.html',
    styleUrls: ['./condition-component.scss'],
    standalone: false
})
export class ConditionComponent implements OnChanges{

  @Input() condition?: ICondition;

  ngOnChanges(changes: SimpleChanges): void {
    //
  }
}