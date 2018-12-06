import { CategoryDTO } from './../../models/categoria.dto';
import { CategoryService } from './../../services/domain/category.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  items: CategoryDTO[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoryService: CategoryService
  ) {
  }

  ionViewDidLoad() {
    this.categoryService.findall().subscribe(response => {
      this.items = response;
    }, error => {

    });
    console.log('');

  }

}
