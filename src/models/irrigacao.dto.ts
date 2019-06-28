import { DateTime } from "ionic-angular";

export interface IrrigacaoDTO{
    id?:string;
    tempo:number;
    data?: DateTime;
    plantioId?:number;   
}