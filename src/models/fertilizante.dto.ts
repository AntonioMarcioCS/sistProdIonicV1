import { DateTime } from "ionic-angular";

export interface FertilizanteDTO{
    id?:string;
    data?: DateTime;
    descricao:string;
    qtd?:number;
    plantioId?:number;   
}