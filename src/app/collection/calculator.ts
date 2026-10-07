import { ICondition } from "./condition";

export interface ICalculator{
  id: number;
  manufacturer: string;
  model: string;
  formFactor: string;
  condition: ICondition;
  date: string;
  display: string;
  description: string;
  imageUrl: string;
}