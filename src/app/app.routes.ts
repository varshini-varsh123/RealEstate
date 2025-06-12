import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
// import { AboutUsComponent } from './about-us/about-us.component';
// import { CallToActionComponentComponent } from './call-to-action-component/call-to-action-component.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertyFormComponent } from './dashboard/propform/propform.component';
import { BookingComponent } from './booking/booking.component';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { PaymentComponent } from './payment/payment.component';
import { AboutComponent } from './about/about.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BookingFormComponent } from './booking/booking-form/booking-form.component';
import { InquiryFormComponent } from './inquiry/inquiry-form/inquiry-form.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { PaymentDashboardComponent } from './payment/payment-dashboard/payment-dashboard.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'properties', component: DashboardComponent,canActivate: [RoleGuard],data: { roles: ['ADMIN','BUYER','SELLER','AGENT'] } },
    { path: 'propform', component: PropertyFormComponent,canActivate: [RoleGuard],data: { roles: ['ADMIN','SELLER','AGENT'] } },
    {path: 'booking',component:BookingComponent,canActivate: [RoleGuard],data: { roles: ['ADMIN','BUYER','SELLER','AGENT'] }},
    {path:'main',component:MaindashboardComponent,canActivate: [AuthGuard,RoleGuard],data: { roles: ['ADMIN','BUYER','SELLER','AGENT'] }},
    {path:'inquiry',component:InquiryComponent,canActivate: [RoleGuard],data: { roles: ['ADMIN','BUYER','SELLER','AGENT'] }},
    {path:'payment',component:PaymentComponent,canActivate: [AuthGuard,RoleGuard],data: { roles: ['ADMIN','BUYER','SELLER','AGENT'] }},
    { path: 'payment/:propertyId', component: PaymentComponent,canActivate: [AuthGuard,RoleGuard],data: { roles: ['ADMIN','BUYER','SELLER','AGENT'] } },
    {path:'about',component:AboutComponent},
    {path:'sidebar',component:SidebarComponent},
    {path:'bookform',component:BookingFormComponent,canActivate: [RoleGuard],data: { roles: ['ADMIN','BUYER','SELLER','AGENT'] }},
    {path:'inqform',component:InquiryFormComponent,canActivate: [RoleGuard],data: { roles: ['ADMIN','BUYER','SELLER','AGENT'] }},
    {path:'pay-dash',component:PaymentDashboardComponent,canActivate: [RoleGuard],data: { roles: ['ADMIN','BUYER','SELLER','AGENT'] }}
    //{ path: 'unauthorized', component: UnauthorizedComponent }
    // { path: 'properties/:id', loadComponent: () =>
    //     import('./models/detail.component').then(m => m.PropertyDetailComponent)
    // }
];
