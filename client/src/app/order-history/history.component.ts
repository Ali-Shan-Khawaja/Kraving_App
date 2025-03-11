import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { CartService } from '../_services/cart.service';
import { OrderService } from '../_services/order.service';
import { OrderHistoryService } from '../_services/order-history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  model: any = {};
  orderHistory: any;

  constructor(
    private authService: AuthService,
    private orderHistoryService: OrderHistoryService) { 
    
  }

  ngOnInit(): void {
    this.fetchHistory();
  }

  fetchHistory() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    this.orderHistoryService.getOrderHistory().subscribe((res: Array<any>) => {
      res = res.filter(function(data){
        return data.userId == user.username;
      })
      this.orderHistory = res;
    });
  }
}