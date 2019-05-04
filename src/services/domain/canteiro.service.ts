import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CanteiroDTO } from "../../models/canteiro.dto";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";


@Injectable()
export class CanteiroService{
    
    constructor(public http: HttpClient, 
                public storage: StorageService){

    }
    findAll(sistema_id): Observable<CanteiroDTO[]>{
        return this.http.get<CanteiroDTO[]>(`${API_CONFIG.baseUrl}/sistemas/${sistema_id}/canteiros`);
    }

    findBySistema(sistema_id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/canteiros/?sistemas=${sistema_id}`);
    }
}