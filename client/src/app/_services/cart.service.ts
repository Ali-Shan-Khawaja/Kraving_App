import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart } from '../_models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = environment.baseUrl;
  cartProductList: Cart[] = [];
  cartModel: any = {};

  constructor(private http: HttpClient) { 
    
  }

  addItemsInCart(menu) {

    const cart: Cart = {
      itemID: menu.itemID,
      itemName: menu.itemName,
      itemPictureURL: menu.itemPictureURL,
      itemUnitPrice: menu.itemUnitPrice,
      price: menu.itemUnitPrice,
      qty: 1
    }

    this.cartProductList.push(cart);
    localStorage.setItem('cart', JSON.stringify(this.cartProductList));
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cartProductList = [];
  }

  checkout(model) {
    console.log("Cart Service");
    const user = JSON.parse(localStorage.getItem('user'));
    
    this.cartModel.userId = user.username;
    this.cartModel.orderedItems = model;
    

    // console.log(this.cartModel);

    return this.http.post(this.baseUrl +'order/add', this.cartModel);
    
    
  }
}
