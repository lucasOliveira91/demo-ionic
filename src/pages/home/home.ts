import { AuthService } from './../../services/auth.service';
import { CredentialsDTO } from './../../models/credentials.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage() //it says this can refereced like page and like string
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredentialsDTO = new CredentialsDTO();

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public authService: AuthService
  ) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.authService.refreshToken().subscribe(response => {
      this.authService.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriesPage');
    }, error => {});
  }

  login() {
    this.authService.authenticate(this.creds).subscribe(response => {
      this.authService.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriesPage');
    }, error => {});
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
