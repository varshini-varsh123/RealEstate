import { Component, OnInit } from '@angular/core';
import { Inquiry } from '../models/inquiry.model';
import { InquiryService } from '../services/inquiry.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Required for *ngFor, *ngIf
import { InquiryFormComponent } from './inquiry-form/inquiry-form.component';

@Component({
  selector: 'app-inquiry',
  standalone: true, // Mark as standalone
  imports: [FormsModule, CommonModule, InquiryFormComponent], // Ensure CommonModule is imported
  templateUrl: './inquiry.component.html',
  styleUrl: './inquiry.component.css'
})
export class InquiryComponent implements OnInit {
  role:string=localStorage.getItem("role");
  inquiries: Inquiry[] = [];
  editingId: number | null = null;
  editableResponse: string = '';
  isDarkMode: boolean = false; // Add dark mode state for consistency

  constructor(private service: InquiryService) {}

  ngOnInit(): void {
    this.loadInquiries();
    // Optional: Load dark mode state from a global service or local storage
  }

  loadInquiries() {

    if(localStorage.getItem("role").startsWith('B')){
      console.log("I am in Inquiry get all by user Id");
      this.service.getInquiryByUserId(parseInt(localStorage.getItem("userId"))).subscribe({
        next:(data) => {
          this.inquiries=data;
          console.log("Inquiries loaded:",data);
        },error: (err) => console.error('Error loading bookings:', err)
      });
    }
    else if(localStorage.getItem("role").startsWith('S')) {
      this.service.getInquiryBySellerId(parseInt(localStorage.getItem("userId"))).subscribe({
        next:(data) => {
          this.inquiries=data;
          console.log("Inquiries loaded:",data);
        },error: (err) => console.error('Error loading bookings:', err)
      });
    }
    else {
    this.service.getAll().subscribe({
      next: (data) => {
        this.inquiries = data;
        console.log('Inquiries loaded:', data);
      },
      error: (err) => console.error('Error loading inquiries:', err)
    });
    }
}

  onInquiryCreated() {
    console.log('New inquiry created, reloading inquiries...');
    this.loadInquiries(); // Reload table when a new inquiry is created
  }

  enableEdit(inquiry: Inquiry) {
    this.editingId = inquiry.inquiryId!;
    this.editableResponse = inquiry.response || '';
  }

  updateResponse(inquiry: Inquiry) {
    // Ensure response is not null if user clears it
    const responseToSave = this.editableResponse.trim() === '' ? null : this.editableResponse;
    const updated: Inquiry = { ...inquiry, response: responseToSave };

    this.service.updateResponse(updated).subscribe({
      next: () => {
        console.log('Inquiry response updated successfully!');
        alert('Inquiry response updated successfully!');
        this.editingId = null; // Exit edit mode
        this.loadInquiries(); // Reload to reflect changes
      },
      error: (err) => {
        console.error('Error updating inquiry response:', err);
        alert('Failed to update inquiry response. Please try again.');
      }
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.editableResponse = ''; // Clear the editable response
  }

  // Add a trackBy function for better *ngFor performance
  trackByInquiryId(index: number, inquiry: Inquiry): number | undefined {
    return inquiry.inquiryId;
  }

  // Optional: Dark mode toggle function (if this component needs its own switch)
  toggleDarkMode(event: Event): void {
    this.isDarkMode = (event.target as HTMLInputElement).checked;
  }
}