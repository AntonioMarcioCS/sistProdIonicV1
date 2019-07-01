import { DateTime } from "ionic-angular";

export interface PlantioDTO{
    id?:string;
    nome:string;
    data?: DateTime;
    colheita?: DateTime;
    qtd?:number;
    canteiroId?: number;
    culturaId?:number;
    //imageUrl:string
}