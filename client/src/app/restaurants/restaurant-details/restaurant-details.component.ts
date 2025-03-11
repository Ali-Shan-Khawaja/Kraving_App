import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/_models/cart';
import { AuthService } from 'src/app/_services/auth.service';
import { CartService } from 'src/app/_services/cart.service';
import { MenuService } from 'src/app/_services/menu.service';
import { RestaurantsService } from 'src/app/_services/restaurants.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  menuList: any;
  restaurant: any = {};

  constructor(public authService: AuthService, private router: Router, 
    private route: ActivatedRoute, private restaurantService: RestaurantsService, 
    private menuService: MenuService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getSingleRestaurant();
    this.getMenuByRid();
  }

  getSingleRestaurant() {
    this.restaurantService.getSingleRestaurant(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.restaurant = res;
      })
  }

  getMenuByRid() {
    this.menuService.getMenuByRid(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.menuList = res;
      })
  }

  deleteMenu(id) {
    console.log(id);

    
    
    if(confirm('Are you sure to delete this item?')) {
      this.menuService.deleteMenuById(id)
      .subscribe(res => {
        console.log(res);
        alert('Your item has been deleted');
      }, err => {
        alert(err);
      })
    }

    window.location.reload();
    
  }

  addMenu() {
    this.router.navigateByUrl('/menu/' +this.route.snapshot.paramMap.get('id'));
  }

  
  addToCart(menu) {
    
    this.cartService.addItemsInCart(menu);
    alert('Item added into the cart!');
    
  }

}
