import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from "@angular/material/menu";
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppRoutingModule } from "./app-routing.module";
import { MatGridListModule} from "@angular/material/grid-list";
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductFormComponent } from './components/productForm/productForm.component';
import { ScrollingModule } from "@angular/cdk/scrolling";
import { MatRadioModule } from "@angular/material/radio";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ShippingComponent } from './components/product-detail/shipping/shipping.component';
import { OtherUserDashboardComponent } from './components/other-user-dashboard/other-user-dashboard.component';
import { SoldproductsComponent } from './components/user-dashboard/soldproducts/soldproducts.component';
import { BoughtproductsComponent } from './components/user-dashboard/boughtproducts/boughtproducts.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule} from "@angular/material/chips";
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSliderModule } from "@angular/material/slider";

import { SearchComponent } from './components/search/search.component';
import { SearchBarComponent } from "./components/dashboard/search-bar/search-bar.component";

import { UserComponent } from "./components/user/user.component";
import { LeaderBoardComponent } from './components/leaderboard/leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    AdminPanelComponent,
    HeaderComponent,
    FooterComponent,
    UserDashboardComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ProductFormComponent,
    ProductDetailComponent,
    ShippingComponent,
    OtherUserDashboardComponent,
    SoldproductsComponent,
    BoughtproductsComponent,
    ProductDisplayComponent,
    SearchBarComponent,
    SearchComponent,
    UserComponent,
    LeaderBoardComponent,
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatGridListModule,
    FlexLayoutModule,
    ScrollingModule,
    MatRadioModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatSliderModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
