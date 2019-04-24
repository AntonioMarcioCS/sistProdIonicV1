import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { SistemaDTO } from "../../models/sistemas.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class SistemasService{
    
    constructor(public http: HttpClient){

    }

    findAll(): Observable<SistemaDTO[]>{
        return this.http.get<SistemaDTO[]>(`${API_CONFIG.baseUrl}/sistemas`);
    }
}