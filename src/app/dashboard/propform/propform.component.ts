import { Component, OnInit } from '@angular/core'; // Import OnInit
import { Router } from '@angular/router';
import { Property } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';
import { FormsModule, NgForm } from '@angular/forms'; // Import NgForm
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf

@Component({
  selector: 'app-propform', // Changed selector for clarity and consistency with Angular best practices
  standalone: true, // Use standalone components
  imports: [FormsModule, CommonModule], // Add CommonModule here
  templateUrl: './propform.component.html',
  styleUrls: ['./propform.component.css']
})
export class PropertyFormComponent implements OnInit { // Implement OnInit

  property: Property = {
    propertyId: 0, // Assuming 0 or null for new property before API assigns one
    title: '',
    location: '',
    price: 0,
    type: '',
    size: 0,
    bedrooms: 0,
    bathrooms: 0,
    status: 'available', // Default status
    sellerId: 0,
  };

  isDarkMode = false; // Added dark mode state

  constructor(private propertyService: PropertyService, private router: Router) { }

  ngOnInit(): void {
    // Optional: any initialization logic if needed
  }

  onSubmit(): void {
    this.propertyService.saveProperty(this.property).subscribe({
      next: () => {
        console.log('Property saved!');
        alert('Property saved successfully!'); // User feedback
        this.router.navigate(['/main']);
      },
      error: (err) => {
        console.error('Error saving property:', err);
        alert('Failed to save property. Please try again.'); // User feedback
      }
    });
    this.router.navigate(['/main']); // Navigate to dashboard after saving
  }

  toggleDarkMode(event: Event): void {
    this.isDarkMode = (event.target as HTMLInputElement).checked;
  }
}