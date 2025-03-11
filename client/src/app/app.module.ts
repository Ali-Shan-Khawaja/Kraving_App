
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RestaurantItemComponent } from './restaurants/restaurant-item/restaurant-item.component';
import { RestaurantDetailsComponent } from './restaurants/restaurant-details/restaurant-details.component';
import { RestaurantEditComponent } from './restaurants/restaurant-edit/restaurant-edit.component';
import { MenuAdminComponent } from './menus/menu-admin/menu-admin.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartService } from './_services/cart.service';
import { RestaurantAddComponent } from './restaurant-add/restaurant-add.component';
import { HashLocationStrategy,LocationStrategy } from '@angular/common';

import { OrderHistoryComponent } from './order-history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignupComponent,
    NavComponent,
    HomeComponent,
    RestaurantItemComponent,
    RestaurantDetailsComponent,
    RestaurantEditComponent,
    MenuAdminComponent,
    CheckoutComponent,
    RestaurantAddComponent,
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
