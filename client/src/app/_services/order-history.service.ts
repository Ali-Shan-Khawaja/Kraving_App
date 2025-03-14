import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  baseUrl = environment.baseUrl +'history/';
  constructor(private http: HttpClient) { }

  getOrderHistory() {
    return this.http.get(this.baseUrl);
  }
}
