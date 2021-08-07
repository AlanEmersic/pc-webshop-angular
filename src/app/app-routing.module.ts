import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart/cart.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductComponent } from './product/product/product.component';
import { AuthGuardService } from './security/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductComponent,
    pathMatch: 'full',
  },
  {
    path: 'products/details/:serialNumber',
    component: ProductDetailsComponent,
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  {
    path: 'customer/:username',
    component: CustomerDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
  },
  {
    path: 'cart',
    component: CartComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
