// import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Payment } from '../../models/payment.model';
import { OrderService } from '../../services/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { Clipboard } from '@angular/cdk/clipboard'; // Import Clipboard

// Material Modules - Keep these imports in the component's @NgModule or standalone imports array
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule for buttons
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-payment-dashboard',
  standalone: true, // Assuming this is a standalone component, otherwise remove
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule // Add MatButtonModule
  ],
  templateUrl: './payment-dashboard.component.html',
  styleUrl: './payment-dashboard.component.css'
})
export class PaymentDashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'razorpayOrderId', 'status', 'email', 'amount', 'userId', 'sellerId', 'createdAt', 'propertyId', 'actions'];
  dataSource: MatTableDataSource<Payment>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userId: number;
  role: string | null;

  constructor(
    private orderService: OrderService,
    private clipboard: Clipboard, // Inject Clipboard service
    private _snackBar: MatSnackBar // Inject MatSnackBar service
  ) {
    this.dataSource = new MatTableDataSource<Payment>([]);

    // Initialize userId and role in the constructor from localStorage
    const storedUserId = localStorage.getItem("userId");
    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0; // Default to 0 or handle appropriately
    this.role = localStorage.getItem("role");
  }

  ngOnInit(): void {
    this.loadPayments();
  }

  ngAfterViewInit(): void {
    // Assign paginator and sort after the view has been initialized
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Loads payment data based on the user's role.
   */
  loadPayments(): void {
    if (this.role === "BUYER") {
      this.orderService.getByBuyerId(this.userId).subscribe({
        next: (data) => {
          this.dataSource.data = data;
          console.log("Buyer payment data loaded:", this.dataSource.data);
        },
        error: (err) => {
          console.error("Error loading buyer payments:", err);
          this._snackBar.open('Failed to load buyer payments.', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      });
    } else if (this.role === "SELLER") {
      this.orderService.getBySellerId(this.userId).subscribe({
        next: (data) => {
          this.dataSource.data = data;
          console.log("Seller payment data loaded:", this.dataSource.data);
        },
        error: (err) => {
          console.error("Error loading seller payments:", err);
          this._snackBar.open('Failed to load seller payments.', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      });
    } else {
      console.warn("User role not recognized or missing.");
      this._snackBar.open('User role not found or recognized. Cannot load payments.', 'Dismiss', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }
  }

  /**
   * Applies a filter to the payment data source.
   * @param event The keyup event from the search input.
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Logs payment details for viewing.
   * In a real application, this would navigate to a detail page or open a dialog.
   * @param payment The payment object to view.
   */
  viewDetails(payment: Payment): void {
    console.log('View details for:', payment);
    // TODO: Implement navigation or modal for details
    this._snackBar.open(`Viewing details for payment ID: ${payment.id}`, 'Dismiss', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  /**
   * Initiates the download of an invoice for a given payment.
   * In a real application, this would call an API to generate and download the invoice.
   * @param payment The payment object for which to download the invoice.
   */
  downloadInvoice(payment: Payment): void {
    console.log('Download invoice for:', payment);
    // TODO: Implement invoice download logic (e.g., calling a service)
    this._snackBar.open(`Downloading invoice for payment ID: ${payment.id}`, 'Dismiss', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  /**
   * Copies the given text to the clipboard and shows a snackbar notification.
   * @param text The text to copy.
   */
  copyToClipboard(text: string): void {
    this.clipboard.copy(text);
    this._snackBar.open('Copied to clipboard!', 'Dismiss', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  /**
   * Returns the CSS class for a payment status badge.
   * @param status The status string (e.g., 'success', 'failed').
   * @returns The corresponding CSS class.
   */
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'success':
        return 'status-success';
      case 'failed':
        return 'status-failed';
      case 'created':
        return 'status-created';
      case 'pending':
        return 'status-pending';
      case 'refunded':
        return 'status-refunded';
      default:
        return '';
    }
  }

  /**
   * Returns the Font Awesome icon class for a payment status.
   * @param status The status string.
   * @returns The corresponding Font Awesome icon class.
   */
  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'success':
        return 'fa-check-circle';
      case 'failed':
        return 'fa-times-circle';
      case 'created':
        return 'fa-hourglass-start';
      case 'pending':
        return 'fa-hourglass-half';
      case 'refunded':
        return 'fa-undo-alt';
      default:
        return 'fa-info-circle';
    }
  }

  /**
   * Initiates the voiding of a payment.
   * In a real application, this would typically involve a confirmation dialog and an API call.
   * @param payment The payment object to void.
   */
  voidPayment(payment: Payment): void {
    console.log('Voiding payment:', payment);
    // TODO: Implement void payment logic (e.g., confirmation dialog, API call to update status)
    this._snackBar.open(`Voiding payment ID: ${payment.id}`, 'Dismiss', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}