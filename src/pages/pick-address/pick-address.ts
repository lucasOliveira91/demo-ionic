import { AddressDTO } from './../../models/address.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { CartService } from '../../services/domain/cart.service';
import { CustumerService } from '../../services/domain/custumer.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: AddressDTO[];

  // pedido: OrderD;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public custumerService: CustumerService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.custumerService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['addresses'];

          let cart = this.cartService.getCart();

          // this.pedido = {
          //   cliente: {id: response['id']},
          //   enderecoDeEntrega: null,
          //   pagamento: null,
          //   itens : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
          // }
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(item: AddressDTO) {
    // this.pedido.enderecoDeEntrega = {id: item.id};
    // this.navCtrl.push('PaymentPage', {pedido: this.pedido});
  }
}