import { DateTime } from "ionic-angular";

export interface AnimalDTO{
    id?:string;
    nome:string;
    raca:string;
    nascimento: DateTime;
    tipo: number;
    criatorioId: number;
}

