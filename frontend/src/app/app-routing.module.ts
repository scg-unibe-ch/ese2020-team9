import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserRegistrationComponent } from "./user-registration/user-registration.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: 'home', component: DashboardComponent},
  { path: 'login', component: UserLoginComponent},
  { path: 'registration', component: UserRegistrationComponent},
  { path: 'user', component: UserDashboardComponent},
  { path: 'admin', component: AdminPanelComponent},
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
