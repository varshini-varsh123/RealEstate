import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
//import { RegisterComponent } from '../register/register.component';
//import { HomeComponent } from '../home/home.component';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'login',
  imports: [RouterOutlet,RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) { }
  validate(form:NgForm) {
    console.log("Login form logged in .....",form.value.uname);
    console.log("Login form logged in .....",form.value.psw);
    let un = localStorage.getItem("username");
    let pwd = localStorage.getItem("password");
    // if(un===form.value.uname && pwd===form.value.psw) {
    //   this.router.navigate(['/employees']);
    // }
  }
}
