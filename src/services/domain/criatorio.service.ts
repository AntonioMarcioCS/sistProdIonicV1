import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CriatorioDTO } from "../../models/Criatorio.dto";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";


@Injectable()
export class CriatorioService{
    
    constructor(public http: HttpClient, 
                public storage: StorageService){

    }
    findAll(sistema_id): Observable<CriatorioDTO[]>{
        return this.http.get<CriatorioDTO[]>(`${API_CONFIG.baseUrl}/sistemas/${sistema_id}/criatorios`);
    }

    findBySistema(sistema_id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/criatorios/?sistemas=${sistema_id}`);
    }
}