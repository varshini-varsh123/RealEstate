import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';  
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'landing',
  imports: [CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  
constructor() { }

 ngOnInit(): void {
 }

}
