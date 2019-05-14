import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { PlantioDTO } from "../../models/plantio.dto";


@Injectable()
export class PlantioService{
    
    constructor(public http: HttpClient, 
                public storage: StorageService){

    }
    find(id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/plantios/${id}`);
    }

    findByCanteiro(canteiro_id:string){
        return this.http.get<PlantioDTO[]>(`${API_CONFIG.baseUrl}/plantios/?canteiros=${canteiro_id}`);
    }

    findAll(): Observable<PlantioDTO[]>{
        return this.http.get<PlantioDTO[]>(`${API_CONFIG.baseUrl}/plantios`);
    }

    insert(obj : PlantioDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/plantios`,
            obj,
            {
                observe:'response',
                responseType: 'text'
            }
        );
    }
}