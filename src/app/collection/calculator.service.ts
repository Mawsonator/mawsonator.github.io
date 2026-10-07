import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { ICalculator } from "./calculator";
import { map, catchError, shareReplay} from "rxjs/operators"

interface ICalculatorJson{
  calcId: number;
  calcManufacturer: string;
  calcModel: string;
  calcFormFactor: string;
  calcCondition: ICalculator["condition"];
  calcDate: string | number;
  calcDisplay: string;
  calcDescription: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private calcUrl = "api/calculators/collection.json"

  constructor(private http: HttpClient){}

  getCalculators(): Observable<ICalculator[]>{
    return this.http.get<ICalculatorJson[]>(this.calcUrl).pipe(
      map(data => data.map(this.toCalculator)),
      catchError(this.handleError),
      shareReplay(1)
    );
  }

  getCalculator(id: number): Observable<ICalculator | undefined>{
    return this.getCalculators().pipe(
      map((calculators: ICalculator[]) => calculators.find(c => c.id === id))
    )
  }

  private toCalculator(raw: ICalculatorJson): ICalculator{
    return {
      id: raw.calcId,
      manufacturer: raw.calcManufacturer,
      model: raw.calcModel,
      formFactor: raw.calcFormFactor,
      condition: raw.calcCondition,
      date: String(raw.calcDate),
      display: raw.calcDisplay,
      description: raw.calcDescription,
      imageUrl: raw.imageUrl ?? ""
    };
  }

  private handleError(err: HttpErrorResponse){
    return throwError(() => err);
  }
}
