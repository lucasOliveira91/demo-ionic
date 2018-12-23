import { ProductDTO } from './../../models/product.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductService } from '../../services/domain/product.service';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items: ProductDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService
  ) {
  }

  ionViewDidLoad() {
    let categoryId = this.navParams.get('categoryId');

    this.productService.findByCategory(categoryId).subscribe(response => {
      this.items = response['content'];
    }, error => {});
  }

}
