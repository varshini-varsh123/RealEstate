import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Inquiry } from '../../models/inquiry.model';
import { InquiryService } from '../../services/inquiry.service';
import { CommonModule } from '@angular/common'; // Required for *ngIf
import { Router } from '@angular/router';

@Component({
  selector: 'app-inquiry-form',
  standalone: true, // Mark as standalone component
  imports: [FormsModule, ReactiveFormsModule, CommonModule], // Ensure CommonModule is included
  templateUrl: './inquiry-form.component.html',
  styleUrl: './inquiry-form.component.css'
})
export class InquiryFormComponent implements OnInit {

  sellerId: number;
  questionerRole: string = localStorage.getItem("role");
  propertyId: number=parseInt(localStorage.getItem("propertyId"));
  questionerId:number=parseInt(localStorage.getItem("userId"));

  @Output() inquiryCreated = new EventEmitter<void>();
  form: FormGroup;
  isDarkMode: boolean = false; // Added for dark mode consistency

  constructor(private fb: FormBuilder, private service: InquiryService,private router:Router) {
    this.form = this.fb.group({
      questionerId: ['', [Validators.required, Validators.min(1)]], // Added min(1) for positive IDs
      questionerRole: ['', Validators.required],
      sellerId: ['', [Validators.required, Validators.min(1)]], // Added min(1)
      propertyId: ['', [Validators.required, Validators.min(1)]], // Added min(1)
      message: ['', Validators.required],
    });

    const navigation = this.router.getCurrentNavigation();
    this.sellerId = navigation?.extras.state?.['sellerId'];
    //this.propertyId=navigation?.extras.state?.['propertyId'];

    this.form.patchValue({
      questionerId: this.questionerId,
      sellerId:this.sellerId,
      propertyId:this.propertyId,
      questionerRole:this.questionerRole
    });

  }

  ngOnInit(): void {
    // You could potentially initialize dark mode state here from a service or local storage
  }

  submit() {
    // Mark all controls as touched to display validation messages immediately
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const inquiry: Inquiry = this.form.value;
      console.log('Submitting inquiry:', inquiry);

      this.service.createInquiry(inquiry).subscribe({
        next: (response) => {
          console.log('Inquiry submitted successfully!', response);
          alert('Your inquiry has been submitted successfully!'); // User feedback
          this.form.reset(); // Clear the form fields after successful submission
          // Optionally reset controls individually to clear validation states properly
          Object.keys(this.form.controls).forEach(key => {
            this.form.controls[key].setErrors(null);
          });
          this.inquiryCreated.emit(); // Notify parent component to refresh the list
          this.form.reset();
        },
        error: (err) => {
          console.error('Error submitting inquiry:', err);
          alert('Failed to submit inquiry. Please check your details and try again.'); // User feedback on error
        }
      });
    } else {
      console.log('Form is invalid. Please check required fields.');
      alert('Please fill in all required fields correctly before submitting.'); // Inform user of invalid form
    }

  }

  // Optional: If this component needs its own dark mode toggle
  toggleDarkMode(event: Event): void {
    this.isDarkMode = (event.target as HTMLInputElement).checked;
  }
}