import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { FertilizanteDTO } from "../../models/fertilizante.dto";


@Injectable()
export class FertilizanteService{
    
    constructor(public http: HttpClient, 
                public storage: StorageService){

    }
    find(id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/fertilizantes/${id}`);
    }

    findByPlantio(plantio_id:string){
        return this.http.get<FertilizanteDTO[]>(`${API_CONFIG.baseUrl}/fertilizantes/?plantio=${plantio_id}`);
    }

    findAll(): Observable<FertilizanteDTO[]>{
        return this.http.get<FertilizanteDTO[]>(`${API_CONFIG.baseUrl}/fertilizantes`);
    }

    insert(obj : FertilizanteDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/fertilizantes`,
            obj,
            {
                observe:'response',
                responseType: 'text'
            }
        );
    }
}