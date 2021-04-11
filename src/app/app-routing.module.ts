import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ImageComponent } from './components/image/image.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full", component:ProductComponent},
  {path:"cars", component:ProductComponent},
  {path:"cars/brand/:brandId", component:ProductComponent},
  {path:"cars/add", component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"customers", component:CustomerComponent},
  {path:"customers/:customerId", component:CustomerComponent},
  {path:"cars/color/:colorId", component:ProductComponent},
  {path:"cars/getbyid/:carId", component:CarAddComponent},
  {path:"cars/:carId", component:CarDetailComponent},
  {path:"cart/cars", component:CartSummaryComponent},
  {path:"brands/add", component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"colors/add", component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"rental/add/:carId", component:RentalComponent, canActivate:[LoginGuard]},
  {path:"carimages/getbyid/:carId", component:ImageComponent},
  {path:"users/getbyid/:Id", component:UserComponent},
  {path:"customers/update/:customerId", component:CustomerComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
