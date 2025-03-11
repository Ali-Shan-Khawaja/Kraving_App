import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  baseUrl = environment.baseUrl +'restaurant/';
  constructor(private http: HttpClient) { }

  getAllRestaurants() {
    return this.http.get(this.baseUrl +'list');
  }

  getSingleRestaurant(id) {
    return this.http.get(this.baseUrl +'list/' +id);
  }
  delete(id) {
    return this.http.delete(this.baseUrl +'deleteRestaurant/' +id);
  }

  addRestaurant(model) {
    return this.http.post(this.baseUrl +'addRestaurant', model);
  }
}
