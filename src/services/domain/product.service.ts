import { CityDTO } from './../../models/city.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { ProductDTO } from '../../models/product.dto';

@Injectable()
export class ProductService {

    constructor(public http: HttpClient) {}

    findByCategory (categoryId: string){
        return this.http.get(`${API_CONFIG.baseUrl}/products/?categories=${categoryId}`);
    }

    getSmallImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }

    findById(id: string) {
        return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${id}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }

}