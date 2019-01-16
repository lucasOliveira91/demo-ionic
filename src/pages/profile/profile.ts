import { API_CONFIG } from './../../config/api.config';
import { CustumerDTO } from './../../models/custumer.dto';
import { CustumerService } from './../../services/domain/custumer.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  custumer: CustumerDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public custumerService: CustumerService
  ) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();

    if(localUser && localUser.email) {
      this.custumerService.findByEmail(localUser.email).subscribe(response => {
        this.custumer = response as CustumerDTO;
        this.getImageifExists();
      }, erro => {
        if(erro.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      })
    }else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageifExists() {
    this.custumerService.getImageFromBucket(this.custumer.id).subscribe(response => {
      this.custumer.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.custumer.id}'.jpg'`
    }, erro => {});
  }

}
