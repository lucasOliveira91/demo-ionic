import { CartService } from './../../services/domain/cart.service';
import { API_CONFIG } from './../../config/api.config';
import { ProductService } from './../../services/domain/product.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  item: ProductDTO;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
   let id = this.navParams.get('id');
    this.productService.findById(id).subscribe(response => {
      this.item = response;
      this.getImageurlIfExists();
   }, error => {});
  }

  getImageurlIfExists() {
    this.productService.getImageFromBucket(this.item.id).subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
    }, error => {});
  }

  addToCart(product: ProductDTO) {
    this.cartService.addProduct(product);
    this.navCtrl.setRoot('CartPage');
  }
}
