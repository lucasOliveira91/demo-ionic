import { ProductDTO } from './../../models/product.dto';
import { Cart } from './../../models/cart';
import { StorageService } from './../storage.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CartService {

    constructor(public storageService: StorageService) {}

    createOrClearCart() : Cart {
        let cart: Cart = {items: []};
        this.storageService.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart = this.storageService.getCart();
        if(!cart) {
            cart = this.createOrClearCart();
        }

        return cart;
    }

    addProduct(product: ProductDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.product.id == product.id);

        if(position == -1) {
            cart.items.push({amount: 1, product: product});
        }

        this.storageService.setCart(cart);
        return cart;
    }


    removeProduct(product: ProductDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.product.id == product.id);

        if(position != -1) {
            cart.items.splice(position, 1);
        }

        this.storageService.setCart(cart);
        return cart;
    }

    increaseQuantity(product: ProductDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.product.id == product.id);

        if(position != -1) {
            cart.items[position].amount++;
        }

        this.storageService.setCart(cart);
        return cart;
    }

    decreaseQuantity(product: ProductDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.product.id == product.id);

        if(position != -1) {
            cart.items[position].amount--;

            if(cart.items[position].amount < 1) {
                cart = this.removeProduct(product);
            }
        }

        this.storageService.setCart(cart);
        return cart;
    }

    total(): number{
        let cart = this.getCart();
        let sum = 0;
        for(var i =0; i < cart.items.length; i++) {
            sum += cart.items[i].product.price * cart.items[i].amount;
        }

        return sum;
    }

}