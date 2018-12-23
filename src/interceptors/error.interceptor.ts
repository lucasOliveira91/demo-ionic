import { FieldMessage } from './../models/fieldmessage';
import { StorageService } from './../services/storage.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public storageService: StorageService,
        public alertCtrl: AlertController
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if(errorObj.error) {
                errorObj = errorObj.error;
            }

            if(!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }
            console.log('error detected by interceptor');
            console.log(errorObj);

            switch(errorObj.status) {
                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                case 422:
                this.handle422(errorObj);
                break;

                default:
                this.handleDefaultError(errorObj);
                break;
            }

            return Observable.throw(errorObj)
        })as any;
    }

    handle403() {
        this.storageService.setLocalUser(null);
    }

    handle401() {
        let alert = this.alertCtrl.create({
            title: '401 Error - Authentication Faleid.',
            message:  'Email or Pass invalid.',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present(); //it's responsable to show the alert.
    }

    handleDefaultError(errorObj) {
        let alert = this.alertCtrl.create({
            title: errorObj.status + 'Error - '+ errorObj.error,
            message:  errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present(); //it's responsable to show the alert.
    }

    handle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: '422 Error - Validation.',
            message:  this.listErros(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present(); //it's responsable to show the alert.
    }

    listErros(messages: FieldMessage[]) : any {
        let s : string = '';
        for (var i = 0; i < messages.length; i ++) {
            s = s + '<p><strong>' +  messages[i].fieldName + '</strong>: ' + messages[i].message
 + '</p>';        }
        return s;
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}