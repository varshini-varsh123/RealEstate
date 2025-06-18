import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
//import { RegisterComponent } from '../register/register.component';
//import { HomeComponent } from '../home/home.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { LoginService, UserDetails } from '../login.service';
import { AuthService } from '../auth.service';
//import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'login',
  imports: [RouterOutlet,RouterLink,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[LoginService]
})
export class LoginComponent {
  private _isLoggedIn: any;
  constructor(private router: Router,private loginService:LoginService,private authService:AuthService) { }
  showPassword: boolean = false;
  loginError: boolean = false;
  validate(form:NgForm) {
    this.loginError = false;
    console.log("Login form logged in .....",form.value.username);
    console.log("Login form logged in .....",form.value.password);
    // this.loginService.userLogin(form.value).subscribe(varshini=>{
    //   console.log(varshini);
    //   localStorage.setItem('token',varshini);
    //   this.router.navigate(['/dashboard']);
    // })
    const credentials: UserDetails = {
      username: form.value.username,
      password: form.value.password
    };
    this.authService.login(credentials).subscribe({
      next: (token) => { 
        console.log('Login successful, token:', token);
        this.router.navigate(['/main']); 
      },
      error: (error) => {
        alert('Login failed. Please check your credentials.');
        //console.error('Login failed:', error);
        this.loginError = true; 
      }
    });

  }
}
