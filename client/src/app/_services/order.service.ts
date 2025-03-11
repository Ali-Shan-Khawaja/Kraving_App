import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getVerifiedNumbers(model) {
    return this.http.post(this.baseUrl +'notification/verifiedNumbers', model);
  }

  sendMessage(model) {
    return this.http.post(this.baseUrl +'notification/sendMessage', model);
  }

  addNumber(model) {
    return this.http.post(this.baseUrl +'notification/addNumber', model);
  }

  verifyNumber(model) {
    return this.http.post(this.baseUrl +'notification/verifyNumber', model);
  }
}
