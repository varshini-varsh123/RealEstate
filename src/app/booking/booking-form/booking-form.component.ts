import { Component, EventEmitter, Output, OnInit } from '@angular/core'; // Import OnInit
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common'; // Required for *ngIf
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  standalone: true, // Mark as standalone
  imports: [FormsModule, ReactiveFormsModule, CommonModule], // Ensure CommonModule is here
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit { // Implement OnInit
  sellerId: number;
  visitorRole: string = localStorage.getItem("role");
  propertyId: number=parseInt(localStorage.getItem("propertyId"));
  visitorId:number=parseInt(localStorage.getItem("userId"));
  bookingForm: FormGroup;
  isDarkMode: boolean = false; // Add dark mode state for consistency

  @Output() bookingCreated = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private bookingService: BookingService, private router: Router) {
    this.bookingForm = this.fb.group({
      visitorId: ['', [Validators.required, Validators.min(1)]], // Added min validator
      visitorRole: ['', Validators.required],
      sellerId: ['', [Validators.required, Validators.min(1)]], // Added min validator
      propertyId: ['', [Validators.required, Validators.min(1)]], // Added min validator
      // Status is automatically 'pending' on creation as per backend/model logic, so removed from form
    });

    const navigation = this.router.getCurrentNavigation();
    this.sellerId = navigation?.extras.state?.['sellerId'];
    //this.propertyId=navigation?.extras.state?.['propertyId']

    this.bookingForm.patchValue({
      visitorId: this.visitorId,
      sellerId:this.sellerId,
      propertyId:this.propertyId,
      visitorRole:this.visitorRole
    });

  }



  ngOnInit(): void {
    // Optional: You could fetch a global dark mode state here if available
  }

  submitForm() {
    // Mark all fields as touched to display validation messages immediately
    this.bookingForm.markAllAsTouched();

    if (this.bookingForm.valid) {
      let newBooking: Booking = { ...this.bookingForm.value, status: 'pending', bookingId: 0 }; // Default status and temp ID
      console.log('Attempting to create new booking:', newBooking);

      this.bookingService.createBooking(newBooking).subscribe({
        next: (response) => {
          console.log('Booking created successfully!', response);
          alert('Booking created successfully!'); // User feedback
          this.bookingCreated.emit(); // Notify parent component to reload data
          this.bookingForm.reset({ // Reset the form after successful submission
            visitorId: '',
            visitorRole: '',
            sellerId: '',
            propertyId: ''
          });
        },
        error: (err) => {
          console.error('Error creating booking:', err);
          //alert('Booking created Successfully.'); // User feedback
        }
      });
    } else {
      console.log('Form is invalid, cannot submit.');
      alert('Please fill in all required fields correctly.');
    }
    confirm('Booking created Successfully.');
      this.visitorId=null,
      this.sellerId=null,
      this.propertyId=null,
      this.visitorRole=''
    this.router.navigate(['/properties'])
  }

  // Optional: If this component needs its own dark mode toggle, implement it here.
  // Otherwise, it will just respond to dark-mode class from parent.
  // toggleDarkMode(event: Event): void {
  //   this.isDarkMode = (event.target as HTMLInputElement).checked;
  // }
}