import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports:[FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roles: ['', Validators.required]
    });
  }

  onSubmit(registerForm:FormGroup) {
    console.log("I am in registration")
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(varshini=>console.log(varshini));
    }
    this.router.navigate(['/login']);
  }
}
