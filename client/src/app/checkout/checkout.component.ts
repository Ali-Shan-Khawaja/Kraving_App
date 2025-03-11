import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { CartService } from '../_services/cart.service';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  orderList = [];
  qty = 0;
  totalPrice = 0;
  cartObj: any = {};

  constructor(private router: Router, 
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService) { 
    this.fetchOrders();
  }

  ngOnInit(): void {
  }

  fetchOrders() {
    this.orderList = JSON.parse(localStorage.getItem('cart'));

    if(this.orderList !== null) {
      for(var i = 0;i<this.orderList.length;i++) {
        this.qty = this.qty + this.orderList[i].qty;
        this.totalPrice = this.totalPrice + this.orderList[i].price;
      }
    } else {
      alert('No item found in the cart!')
    }
  }

  clearCart() {
    this.cartService.clearCart();
    localStorage.removeItem('cart');
    alert('Item removed from the cart!');
    this.router.navigateByUrl('/home');
  }

  checkout() {
    this.cartObj.totalqty = this.qty;
    this.cartObj.totalPrice = this.totalPrice;
    this.cartObj.orders = this.orderList;
    // console.log(this.cartObj);

    const user = JSON.parse(localStorage.getItem('user'));

    this.authService.getUserById(user.username)
      .subscribe((res:any) => {
        this.cartObj.Number = res.Number; 
      })
    
    setTimeout(() => {
      this.orderService.getVerifiedNumbers(this.cartObj)
      .subscribe((res:any) => {
        // console.log(res);
        
        if(res.Status) {
          // send message
          var model = {
                Message: 'Hi Your ordered has been placed. Thank you for ordering from Kraving App',
                Subject: 'Testing',
                PhoneNumber: this.cartObj.Number
              };
          this.orderService.sendMessage(model)
            .subscribe(res => {
              // console.log(res);

              this.cartService.checkout(this.cartObj)
                .subscribe(res => {
                  alert('Order Placed')
                  this.cartService.clearCart();
                  this.router.navigateByUrl('/home');
                })
              
            })
        } else {

          var phoneModel = {
            "PhoneNumber": this.cartObj.Number
          }

          this.orderService.addNumber(phoneModel)
            .subscribe(res => {
              
              let otp = prompt("Please enter the otp", "");

              if (otp == null || otp == "") {
                console.log('User cancelled');
                
              } else {
                // console.log(this.cartObj.Number);
                
                var otpModel = {
                  "PhoneNumber": this.cartObj.Number,
                  "OneTimePassword": otp
                };

                this.orderService.verifyNumber(otpModel)
                  .subscribe(res => {

                    var model = {
                      Message: 'Hi Your ordered has been placed. Thank you for ordering from Kraving App',
                      Subject: 'Testing',
                      PhoneNumber: this.cartObj.Number
                    };
                    this.orderService.sendMessage(model)
                      .subscribe(res => {
                        // console.log(res);
          
                        this.cartService.checkout(this.cartObj)
                          .subscribe(res => {
                            alert('Order Placed')
                            this.cartService.clearCart();
                            this.router.navigateByUrl('/home');
                          })
                        
                      })

                    this.cartService.clearCart();
                    
                  }); 
                
              }

            }); 
        }
        
      });
    }, 500);
    
    
  }

}
