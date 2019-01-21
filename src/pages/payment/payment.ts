import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderDTO } from './../../models/order.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  order: OrderDTO;
  installments: number[];
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder) {
      this.order =  navParams.get("order");

      this.formGroup = this.fb.group({
        numberInstallments: [1, Validators.required],
        "@type" :  ["", Validators.required]
      });
  }


  nextPage() {
    this.order.payment = this.formGroup.value;
    this.navCtrl.setRoot("OrderConfirmationPage", {order: this.order});
  }
}
