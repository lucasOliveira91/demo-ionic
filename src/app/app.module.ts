import { ProductService } from './../services/domain/product.service';
import { AuthInterceptorProvider } from './../interceptors/auth-interceptor';
import { CustumerService } from './../services/domain/custumer.service';
import { StorageService } from './../services/storage.service';
import { AuthService } from './../services/auth.service';
import { ErrorInterceptorProvider } from './../interceptors/error.interceptor';
import { CategoryService } from './../services/domain/category.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    CategoryService,
    StatusBar,
    SplashScreen,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    CustumerService,
    ProductService
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
