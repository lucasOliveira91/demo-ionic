import { CityDTO } from './../../models/city.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProductService {

    constructor(public http: HttpClient) {}

    findByCategory (categoryId: string){
        return this.http.get(`${API_CONFIG.baseUrl}/product/?category=${categoryId}`);
    }
}