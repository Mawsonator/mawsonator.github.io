import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICalculator } from './calculator';
import { CalculatorService } from './calculator.service';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss'],
    standalone: false
})
export class CollectionComponent implements OnInit, AfterViewInit{

  
  dataSource = new MatTableDataSource<ICalculator>();
  // Visual column order
  displayedColumns = ["image", "manufacturer", "model", "date", "formFactor", "display", "condition"];
  normalColumns = ["id", "manufacturer", "model", "date", "formFactor", "display", "Description"]
  showImage: boolean = true;
  errorMessage: string = "";

  // The three calculators (by id) featured in the gallery at the top of the page
  galleryCalculatorIds = [1, 2, 11];
  galleryItems: ICalculator[] = [];

  constructor(private calculatorService: CalculatorService, private observer: BreakpointObserver) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getCalculators()
    this.observer.observe('(max-width: 600px)').subscribe(result =>{
      this.displayedColumns = result.matches ? ["manufacturer", "model", "date"] : ["image", "manufacturer", "model", "date", "formFactor", "display", "condition"];
    })
  }

  applyFilter(e :Event){
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  getCalculators(){
    this.calculatorService.getCalculators()
      .subscribe((res) =>{
        this.dataSource.data = res;
        this.galleryItems = this.galleryCalculatorIds
          .map(id => res.find(c => c.id === id))
          .filter((c): c is ICalculator => !!c);
    })
  }
}
