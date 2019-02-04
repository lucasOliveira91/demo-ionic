import { API_CONFIG } from './../../config/api.config';
import { ProductDTO } from './../../models/product.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductService } from '../../services/domain/product.service';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items: ProductDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoryId = this.navParams.get('categoryId');

    let loader = this.presentLoading();
    this.productService.findByCategory(categoryId,this.page, 10).subscribe(response => {
      let start = this.items.length;
      this.items = this.items.concat(response['content']);
      let end = this.items.length -1;
      loader.dismiss();
      this.loadImageUrls(start, end);
    }, error => {
      loader.dismiss();
    });
  }

  loadImageUrls(start:number, end: number) {
    for (var i=start; i<=end; i++){
      let item = this.items[i];
      this.productService.getSmallImageFromBucket(item.id).subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      }, error => {});
    }
  }

  showDetail(id: string) {
    this.navCtrl.push('ProductDetailPage', {id: id});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Wating..."
    });

    loader.present();
    return loader;
  }

  doRefresh(event) {
    this.page = 0;
    this.items = [];
    
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
