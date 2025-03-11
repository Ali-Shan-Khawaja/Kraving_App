import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'src/app/_services/restaurants.service';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.css']
})
export class RestaurantEditComponent implements OnInit {

  model: any = {};

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantsService) { }

  ngOnInit(): void {
    this.getSingleRestaurant();
  }

  getSingleRestaurant() {
    this.restaurantService.getSingleRestaurant(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.model = res;
      })
  }

  editRestaurant() {
    console.log(this.model);
    
  }

}
