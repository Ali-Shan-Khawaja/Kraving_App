import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantsService } from '../_services/restaurants.service';

@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.component.html',
  styleUrls: ['./restaurant-add.component.css']
})
export class RestaurantAddComponent implements OnInit {

  model: any = {};

  constructor(private restaurantService: RestaurantsService, private router: Router) { }

  ngOnInit(): void {
  }

  addRestaurant() {
    console.log(this.model);
    this.restaurantService.addRestaurant(this.model)
      .subscribe(res => {
        this.router.navigateByUrl('/home');
      })
  }

}
