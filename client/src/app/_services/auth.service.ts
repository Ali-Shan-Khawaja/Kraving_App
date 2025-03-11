import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/users';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  getSample() {
    console.log(this.baseUrl);
    return this.http.get(this.baseUrl);
  }

  login(model) {
    return this.http.post(this.baseUrl +'auth/login', model)
      .pipe(
        map((response: any) => {
          var user: User;
          const obj:any = {};
          if(response.success) {
            
            // console.log(response.data.accessToken.jwtToken);
            // console.log(response.data.accessToken.payload.username);
            
            
            obj.token = response.data.accessToken.jwtToken;
            obj.username = response.data.accessToken.payload.username;
            obj.success = true;
            obj.isAdmin = response.isAdmin;

            localStorage.setItem('user', JSON.stringify(obj));
            this.currentUserSource.next(obj);
          }
          return obj;
        })
      );
  }
  
  signup(model) {
    return this.http.post(this.baseUrl +'auth/signup', model);
  }

  getUserById(id) {
    return this.http.get(this.baseUrl +'auth/getUserById/' +id);
  }
  

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    this.currentUserSource.next(null);
  }
}
