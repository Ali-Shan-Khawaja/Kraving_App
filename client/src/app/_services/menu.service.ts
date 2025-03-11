import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  baseUrl = environment.baseUrl +'menu/';
  constructor(private http: HttpClient) { }

  getMenuByRid(id) {
    return this.http.get(this.baseUrl +'list/' +id);
  }

  deleteMenuById(id) {
    return this.http.delete(this.baseUrl +'deleteMenu/' +id);
  }

  addMenu(model) {
    return this.http.post(this.baseUrl +'addMenu', model);
  }
}
