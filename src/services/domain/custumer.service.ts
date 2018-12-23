import { API_CONFIG } from './../../config/api.config';
import { CustumerDTO } from './../../models/custumer.dto';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CustumerService{

    constructor(public http: HttpClient) {}

    findByEmail(email: string): Observable<CustumerDTO>{
       return this.http.get<CustumerDTO>(`${API_CONFIG.baseUrl}/custumer/email?value=${email}`);
    }

    getImageFromBucket(id: number) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.png`;
        return this.http.get(url, {responseType : 'blob'})
    }

    insert(obj: CustumerDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/custumer`, obj, {observe: 'response', responseType: 'text'});
    }
}