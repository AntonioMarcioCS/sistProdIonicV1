import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { CulturaDTO } from "../../models/cultura.dto";


@Injectable()
export class CulturaService{
    
    constructor(public http: HttpClient, 
                public storage: StorageService){

    }
    findAll(): Observable<CulturaDTO[]>{
        return this.http.get<CulturaDTO[]>(`${API_CONFIG.baseUrl}/culturas`);
    }
    findById(id:string){
        return this.http.get<CulturaDTO>(`${API_CONFIG.baseUrl}/culturas/${id}`)
    }


}