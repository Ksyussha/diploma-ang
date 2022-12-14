import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './cart/cart.component';
import { ToursComponent } from './tours/tours.component';
import { TourComponent } from './tour/tour.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';



const routes: Routes = [
 { path:'', component: HomeComponent},
 { path:'tours', component: ToursComponent},
 { path:'tours/:id', component: TourComponent},
 { path:'login', component: LoginComponent},
 { path:'auth', component: AuthComponent},
 { path:'cart', component: CartComponent},
 {path:'about', component: AboutComponent},
 {path:'admin', component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
