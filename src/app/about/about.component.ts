import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { FeatureCardComponent } from '../feature-card/feature-card.component';

@Component({
  selector: 'app-about',
  imports: [FormsModule,CommonModule,ReactiveFormsModule,FeatureCardComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, OnDestroy {
  // Array of image URLs for the carousel
  images: string[] = [
    "loginbg3.jpg", // Modern Home
    "loginbg2.jpg", // Luxury Villa
    "bright.jpg", // Cozy Apartment
    "bg1.jpg"  // Spacious Condo
  ];

  currentIndex: number = 0; // Current index of the displayed image
  private carouselSubscription: Subscription | undefined; // Subscription to manage the carousel interval

  constructor() { }

  // Lifecycle hook: Called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {
    // Start the auto-play carousel interval
    this.carouselSubscription = interval(5000).subscribe(() => {
      this.goToNext(); // Advance to the next slide every 5 seconds
    });
  }

  // Lifecycle hook: Called once, before the directive is destroyed.
  ngOnDestroy(): void {
    // Clean up the carousel interval to prevent memory leaks
    if (this.carouselSubscription) {
      this.carouselSubscription.unsubscribe();
    }
  }

  // Navigates to a specific slide by index
  goToSlide(slideIndex: number): void {
    this.currentIndex = slideIndex;
  }

  // Navigates to the previous slide
  goToPrev(): void {
    this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
  }

  // Navigates to the next slide
  goToNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}
