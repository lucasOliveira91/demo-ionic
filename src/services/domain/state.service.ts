import { StateDTO } from './../../models/state.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class StateService {

    constructor(public http: HttpClient) {}

    findall () : Observable<StateDTO[]>{
        return this.http.get<StateDTO[]>(`${API_CONFIG.baseUrl}/state`);
    }
}