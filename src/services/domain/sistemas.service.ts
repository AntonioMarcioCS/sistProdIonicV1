import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { SistemaDTO } from "../../models/sistemas.dto";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";


@Injectable()
export class SistemasService{
    
    constructor(public http: HttpClient, 
                public storage: StorageService){

    }
    findById(sistema_id:string){
        return this.http.get<SistemaDTO>(`${API_CONFIG.baseUrl}/sistemas/${sistema_id}`)
    }

    findAll(): Observable<SistemaDTO[]>{
        return this.http.get<SistemaDTO[]>(`${API_CONFIG.baseUrl}/sistemas`);
    }
}