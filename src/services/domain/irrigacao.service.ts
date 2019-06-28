import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { IrrigacaoDTO } from "../../models/irrigacao.dto";


@Injectable()
export class IrrigacaoService{
    
    constructor(public http: HttpClient, 
                public storage: StorageService){

    }
    find(id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/irrigacao/${id}`);
    }

    findByPlantio(plantio_id:string){
        return this.http.get<IrrigacaoDTO[]>(`${API_CONFIG.baseUrl}/irrigacao/?plantio=${plantio_id}`);
    }

    findAll(): Observable<IrrigacaoDTO[]>{
        return this.http.get<IrrigacaoDTO[]>(`${API_CONFIG.baseUrl}/irrigacao`);
    }

    insert(obj : IrrigacaoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/irrigacao`,
            obj,
            {
                observe:'response',
                responseType: 'text'
            }
        );
    }
}