import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingComponent } from './booking/booking.component';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';
import { BookingFormComponent } from './booking/booking-form/booking-form.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { AboutComponent } from './about/about.component';
import { FeatureCardComponent } from './feature-card/feature-card.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from './auth.service';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { PaymentDashboardComponent } from './payment/payment-dashboard/payment-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LandingComponent,LoginComponent,HeaderComponent,RegisterComponent,DashboardComponent,BookingComponent,MaindashboardComponent,BookingFormComponent,InquiryComponent,AboutComponent,FeatureCardComponent,SidebarComponent,ProfileCardComponent,PaymentDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RealEstate';
  constructor(public authService: AuthService) {}
}
