import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { AnimalDTO } from "../../models/animal.dto";


@Injectable()
export class AnimalService{
    
    constructor(public http: HttpClient, 
                public storage: StorageService){

    }
    find(id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/animais/${id}`);
    }

    findByCriatorio(criatorio_id:string){
        return this.http.get<AnimalDTO[]>(`${API_CONFIG.baseUrl}/animais/?criatorio=${criatorio_id}`);
    }

    findAll(): Observable<AnimalDTO[]>{
        return this.http.get<AnimalDTO[]>(`${API_CONFIG.baseUrl}/animais`);
    }

    insert(obj : AnimalDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/animais`,
            obj,
            {
                observe:'response',
                responseType: 'text'
            }
        );
    }
}