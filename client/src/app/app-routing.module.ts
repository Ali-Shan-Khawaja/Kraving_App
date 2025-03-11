import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderHistoryComponent } from './order-history/history.component';
import { HomeComponent } from './home/home.component';
import { MenuAdminComponent } from './menus/menu-admin/menu-admin.component';
import { RestaurantAddComponent } from './restaurant-add/restaurant-add.component';
import { RestaurantDetailsComponent } from './restaurants/restaurant-details/restaurant-details.component';
import { RestaurantEditComponent } from './restaurants/restaurant-edit/restaurant-edit.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  { path: '', component: AuthComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'restaurant/:id', component: RestaurantDetailsComponent},
  { path: 'restaurant-edit/:id', component: RestaurantEditComponent},
  { path: 'restaurant-add', component: RestaurantAddComponent},
  { path: 'menu/:id', component: MenuAdminComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'history', component: OrderHistoryComponent},
  { path: '*', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
