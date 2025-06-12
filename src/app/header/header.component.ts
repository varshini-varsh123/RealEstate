import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { LoginComponent } from '../login/login.component';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

@Component({
  selector: 'header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, LoginComponent, FormsModule, ProfileCardComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isSidebarOpen: boolean = false;
  location = '';
  minPrice = 0;
  maxPrice = 10000000;
  type = 'apartment';
  showFilters = false;
  properties: any[] = [];
  isDarkMode: boolean = false;
  searchTerm: string = '';
  isOnAuthPage: boolean = false;

  @Output() openSidebar = new EventEmitter<void>();
  constructor(private router: Router, public authService: AuthService, private http: HttpClient,private dialog: MatDialog) { }
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Check if the current URL is /login or /register
      this.isOnAuthPage = event.urlAfterRedirects === '/login' || event.urlAfterRedirects === '/register';
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login after logout
  }

  navigateToDashboard(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      this.router.navigate(['/properties']);
    } else {
      alert('Please log in to access the Dashboard.');
      this.router.navigate(['/login']);
    }
  }
  navigateToMainDashBoard() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      this.router.navigate(['/main']);
    }
    else {
      alert('Please log in to access the Dashboard.');
      this.router.navigate(['/login']);
    }
  }


  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  applyFilters() {
    const params = {
      location: this.location,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      type: this.type
    };

    this.http.get<any[]>('http://localhost:9091/properties/search', { params }).subscribe(data => {
      this.properties = data;
      this.showFilters = false;
      // Optionally navigate or display results
      console.log(this.properties)
    });
  }
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }


  openProfile(): void {
    const userData = {
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
      role: localStorage.getItem("role"),
      email: localStorage.getItem("email")
    };

    this.dialog.open(ProfileCardComponent, {
      data: userData
    });
  }



}
