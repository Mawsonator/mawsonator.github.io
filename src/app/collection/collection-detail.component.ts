import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICalculator } from "./calculator";
import { CalculatorService } from "./calculator.service";
import { Location } from "@angular/common";

@Component({
    selector: 'calc-collection-detail',
    templateUrl: './collection-detail.component.html',
    styleUrls: ['./collection-detail.component.scss'],
    standalone: false
})
export class CollectionDetailComponent implements OnInit{

  calculator?: ICalculator;

  constructor(private route: ActivatedRoute,
              private calculatorService: CalculatorService,
              private location: Location){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getCalculator(id);
  }

  getCalculator(id: number){
    this.calculatorService.getCalculator(id).subscribe({
        next: calc => this.calculator = calc
    })
  }

  onBackClick(){
    this.location.back();
  }
}