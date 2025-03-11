import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../_services/restaurants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  restaurantList: any;
  constructor(private restaurantService: RestaurantsService) { }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.restaurantService.getAllRestaurants()
      .subscribe(res => {
        console.log(res);
        this.restaurantList = res;

      })
  }

}
