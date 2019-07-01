import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { ColheitaDTO } from "../../models/colheita.dto";


@Injectable()
export class ColheitaService{
    
    constructor(public http: HttpClient, 
                public storage: StorageService){
    }
    find(id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/colheitas/${id}`);
    }

    findByPlantio(plantio_id:string){
        return this.http.get<ColheitaDTO[]>(`${API_CONFIG.baseUrl}/colheitas/?plantio=${plantio_id}`);
    }

    findAll(): Observable<ColheitaDTO[]>{
        return this.http.get<ColheitaDTO[]>(`${API_CONFIG.baseUrl}/colheitas`);
    }

    insert(obj : ColheitaDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/colheitas`,
            obj,
            {
                observe:'response',
                responseType: 'text'
            }
        );
    }
    
}