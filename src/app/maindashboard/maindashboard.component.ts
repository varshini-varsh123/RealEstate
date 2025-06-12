import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { PaymentComponent } from '../payment/payment.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-maindashboard',
  imports: [RouterLink,RouterModule,SidebarComponent],
  templateUrl: './maindashboard.component.html',
  styleUrl: './maindashboard.component.css'
})
export class MaindashboardComponent implements OnInit {
  isSidebarOpen: boolean = false;
  constructor() { }

  ngOnInit(): void {
    // Initialization logic for your dashboard, if any
  }
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Closes the sidebar, useful when a navigation item is clicked
  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
}
