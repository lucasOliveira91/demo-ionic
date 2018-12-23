import { CityDTO } from './../../models/city.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CityService {

    constructor(public http: HttpClient) {}

    findall (state_id: any) : Observable<CityDTO[]>{
        return this.http.get<CityDTO[]>(`${API_CONFIG.baseUrl}/state/${state_id}/cities`);
    }
}