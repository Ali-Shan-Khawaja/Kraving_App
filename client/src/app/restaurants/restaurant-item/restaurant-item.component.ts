import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { RestaurantsService } from 'src/app/_services/restaurants.service';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.css']
})
export class RestaurantItemComponent implements OnInit {

  @Input() restaurant:any;
  constructor(public authService: AuthService, private restaurantService: RestaurantsService,private router: Router) { }

  ngOnInit(): void {
  }

  fetchSingleRestaurant(id) {
    console.log(id);
    
  }

  deleteRestaurant(id) {
    console.log(id);
    
    if(confirm('Are you sure to delete this item?')) {
      this.restaurantService.delete(id)
        .subscribe(res => {
          console.log(res);
          alert('Your item has been deleted');
        }, err => {
          alert(err);
        })
    }

    
    window.location.reload();
    
  }

  detail(id){
    this.router.navigateByUrl('/restaurant/'+id);
  }

}
