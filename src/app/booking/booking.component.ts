import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking.model';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Important for ngIf, ngFor, date pipe
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BookingFormComponent } from './booking-form/booking-form.component'; // Ensure correct path

@Component({
  selector: 'app-booking', // Changed selector for clarity and consistency
  standalone: true, // Mark as standalone
  imports: [
    FormsModule,
    CommonModule, // Required for Angular directives like *ngFor, *ngIf, and pipes
    RouterLink,
    ReactiveFormsModule, // If your booking-form component uses ReactiveForms
    RouterModule,
    BookingFormComponent
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  editingId: number | null = null;
  editableStatus: string = '';
  isDarkMode: boolean = false; // Add dark mode state
  role:string=localStorage.getItem("role");

  constructor(private bookingService: BookingService,private router:Router) {
   }

  ngOnInit() {
    this.loadBookings();
    // Optional: Check local storage or user preferences for initial dark mode state
    // this.isDarkMode = localStorage.getItem('darkMode') === 'true';
  }

  loadBookings() {

    if(localStorage.getItem("role").startsWith('B')){
      this.bookingService.getBookingsByUserId(parseInt(localStorage.getItem("userId"))).subscribe({
        next:(data) => {
          this.bookings=data;
          console.log("Bookings loaded:",data);
        },error: (err) => console.error('Error loading bookings:', err)
      });
    }
    else if(localStorage.getItem("role").startsWith('S')) {
      this.bookingService.getBookingsBySellerId(parseInt(localStorage.getItem("userId"))).subscribe({
        next:(data)=> {
          this.bookings = data;
          console.log("bookings loaded:",data);
        },error:(err)=> console.error('Error has Occured:',err)
      });
    }
    else{
    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        console.log('Bookings loaded:', data);
      },
      error: (err) => console.error('Error loading bookings:', err)
    });
  }
  }

  enableEdit(booking: Booking) {
    this.editingId = booking.bookingId!;
    this.editableStatus = booking.status || '';
  }

  updateBookingStatus(booking: Booking) {
    const updated = { ...booking, status: this.editableStatus };
    this.bookingService.updateBookingStatus(booking.bookingId!, updated).subscribe({
      next: () => {
        console.log('Booking status updated successfully!');
        this.editingId = null; // Exit edit mode
        this.loadBookings(); // Reload to reflect changes and potentially re-sort/filter
      },
      error: (err) => {
        console.error('Error updating booking status:', err);
        alert('Failed to update booking status. Please try again.');
      }
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.editableStatus = ''; // Clear editable status
  }

  onBookingCreated() {
    console.log('New booking created, reloading bookings...');
    this.loadBookings(); // Reload table when booking is created
  }

  deleteBooking(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this booking? This action cannot be undone.');
    if (confirmed) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          console.log('Booking deleted successfully!');
          this.loadBookings(); // Reload bookings after deletion
        },
        error: (err) => {
          console.error('Error deleting booking:', err);
          alert('Failed to delete booking. Please try again.');
        }
      });
    }
  }

  // Add a trackBy function for better *ngFor performance
  trackByBookingId(index: number, booking: Booking): number | undefined {
    return booking.bookingId;
  }

  // Dark mode toggle function (optional, if you want a local switch)
  toggleDarkMode(event: Event): void {
    this.isDarkMode = (event.target as HTMLInputElement).checked;
    // Optional: Save dark mode preference to local storage
    // localStorage.setItem('darkMode', this.isDarkMode.toString());
  }
}