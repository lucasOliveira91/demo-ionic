import { CategoryDTO } from './../../models/categoria.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoryService {

    constructor(public http: HttpClient) {}

    findall () : Observable<CategoryDTO[]>{
        return this.http.get<CategoryDTO[]>(`${API_CONFIG.baseUrl}/category`);
    }
}