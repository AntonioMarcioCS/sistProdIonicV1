import { DateTime } from "ionic-angular";

export interface ColheitaDTO{
    id?:string;
    qtd:number;
    data?: DateTime;
    plantioId?:number;   
}