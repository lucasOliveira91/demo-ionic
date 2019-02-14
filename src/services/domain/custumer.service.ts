import { ImageUtilSerice } from './../image-uitl.service';
import { API_CONFIG } from './../../config/api.config';
import { CustumerDTO } from './../../models/custumer.dto';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CustumerService{

    constructor(
        public http: HttpClient,
        public imageUtilSerice: ImageUtilSerice
    ) {}

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/custumer/${id}`);
     }

    findByEmail(email: string) {
       return this.http.get(`${API_CONFIG.baseUrl}/custumer/email?value=${email}`);
    }

    getImageFromBucket(id: number) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.png`;
        return this.http.get(url, {responseType : 'blob'})
    }

    insert(obj: CustumerDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/custumer`, obj, {observe: 'response', responseType: 'text'});
    }

    uploadPicture(picture) {
        let pictureBlob = this.imageUtilSerice.dataUriToBlob(picture);
        let formData: FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');

        return this.http.post(`${API_CONFIG.baseUrl}/custumer/picture`, formData, {observe: 'response', responseType: 'text'});
    }
}