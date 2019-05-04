import { DateTime } from "ionic-angular";

export interface SistemaDTO{
    id: string;
    nome: string;
    data: DateTime;
    comprimento: string;
    largura: string;
    usuario?: number;
}