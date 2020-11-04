import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UserLoginComponent } from "./components/user-login/user-login.component";
import { UserRegistrationComponent } from "./components/user-registration/user-registration.component";
import { UserDashboardComponent } from "./components/user-dashboard/user-dashboard.component";
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ProductFormComponent } from "./components/productForm/productForm.component";


const routes: Routes = [
  { path: 'home', component: DashboardComponent},
  { path: 'login', component: UserLoginComponent},
  { path: 'registration', component: UserRegistrationComponent},
  { path: 'user', component: UserDashboardComponent},
  { path: 'admin', component: AdminPanelComponent},
  { path: 'productForm/:id', component: ProductFormComponent},
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
