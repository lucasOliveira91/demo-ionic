import { OrderService } from './../../services/domain/order.service';
import { CustumerService } from './../../services/domain/custumer.service';
import { AddressDTO } from './../../models/address.dto';
import { CustumerDTO } from './../../models/custumer.dto';
import { CartService } from './../../services/domain/cart.service';
import { Cartitem } from './../../models/cart-item';
import { OrderDTO } from './../../models/order.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  order: OrderDTO;
  cardItems: Cartitem[];
  custumer: CustumerDTO;
  address: AddressDTO;
  codorder: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public custumerService: CustumerService,
    public orderService: OrderService) {
    this.order = this.navParams.get("order");
  }

  ionViewDidLoad() {
    this.cardItems = this.cartService.getCart().items;

    this.custumerService.findById(this.order.custumer.id).subscribe(response =>{
      this.custumer = response as CustumerDTO;
      this.address = this.findAddress(this.order.deriveryAddress.id, response['addresses']);
    }, error => {
      this.navCtrl.setRoot('HomePage');
    });
  }

  private findAddress(id: string, list: AddressDTO[]) : AddressDTO{
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  private total() {
    return this.cartService.total();
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  home() {
    this.navCtrl.setRoot('CategoryPage');
  }

  checkout() {
    this.orderService.insert(this.order).subscribe(response => {
      this.cartService.createOrClearCart();
      this.codorder = this.extractId(response.headers.get('location'));
    }, error => {
      if(error.status == 403) {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  private extractId(location: string): string {
    let position = location.lastIndexOf('/');
    return location.substr(position + 1);
  }
}
