import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UserLoginComponent } from "./components/user-login/user-login.component";
import { UserRegistrationComponent } from "./components/user-registration/user-registration.component";
import { UserDashboardComponent } from "./components/user-dashboard/user-dashboard.component";
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ProductFormComponent } from "./components/productForm/productForm.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { ShippingComponent } from './components/product-detail/shipping/shipping.component';
import { OtherUserDashboardComponent } from './components/other-user-dashboard/other-user-dashboard.component';
import { ProductDisplayComponent } from "./components/product-display/product-display.component";
import { FilterComponent } from "./components/product-display/filter/filter.component";

const routes: Routes = [
  { path: 'home', component: DashboardComponent},
  { path: 'login', component: UserLoginComponent},
  { path: 'registration/:id', component: UserRegistrationComponent},
  { path: 'user', component: UserDashboardComponent},
  { path: 'admin', component: AdminPanelComponent},
  { path: 'productForm/:id', component: ProductFormComponent},
  { path: 'productDetail/:id', component: ProductDetailComponent},
  { path: 'shipping/:id', component: ShippingComponent},
  { path: 'user/:id', component: OtherUserDashboardComponent},
  { path: 'search', component: ProductDisplayComponent},
  { path: 'input', component: FilterComponent},
  //default route
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  //wildcard route for 404 page
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
