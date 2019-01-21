import { OrderDTO } from './../../models/order.dto';
import { CityDTO } from './../../models/city.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OrderService {

    constructor(public http: HttpClient) {}

    insert (obj: OrderDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/order`, obj, {observe: 'response', responseType: 'text'});
    }
}