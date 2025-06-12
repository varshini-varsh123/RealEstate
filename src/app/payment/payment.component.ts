import { Component, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { OrderService } from '../services/order.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
   userId = localStorage.getItem("userId");
  TOKEN_KEY: string = "token";
  form: any = {};
  paymentId: string = '';
  error: string = '';
  response: any = {};
  show: boolean = false;

  propertyId: number;
  sellerId:number;
  amount: number = +localStorage.getItem("price"); // ₹500 as default
  email:string=localStorage.getItem("email");
  options: any = {
    key: '',
    amount: '',
    name: 'Real Estate Property Listing',
    description: 'CaseStudy',
    image: 'house.jpg',
    order_id: '',
    paymentstatus: '',
    handler: () => {}, // will be set dynamically
    prefill: {
      name: '',
      email: '',
      contact: ''
    },
    notes: {
      address: ''
    },
    theme: {
      color: '#3399cc'
    }
  };

  constructor(
    private http: HttpClient,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private router:Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.propertyId = navigation?.extras.state?.['propId'];
    this.sellerId=navigation?.extras.state?.['sellerId']
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //this.propertyId = +params['propertyId'];
      console.log("Property ID from route:", this.propertyId);

      this.form = {
        amount: this.amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        receipt: 'receipt#1',
        notes: {
          purpose: 'Buying The Property'
        }
      };

      this.onSubmit();
    });
  }
  navigateToProperties(): void {
    this.router.navigate(['/properties']); // Adjust '/properties' to your actual route for listing properties
  }
  retryPayment(): void {
    console.log('Retrying payment...');
  }
  onSubmit(): void {
    this.paymentId = '';
    this.error = '';

    this.orderService.createOrder(this.form).subscribe(
      (data: any) => {
        console.log("Received response from backend:", data);

        this.options.key = data.secretId;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee;
        this.options.prefill.name = 'Buying the Property';
        this.options.prefill.contact = '8861847100';

        // Bind `this` to use inside handler
        const self = this;
        this.options.handler = function (response: any) {
          const event = new CustomEvent("payment.success", {
            detail: {
              ...response,
              propertyId: self.propertyId,
              amount: self.amount,
              userId:self.userId,
              email:self.email,
            },
            bubbles: true,
            cancelable: true
          });
          window.dispatchEvent(event);
        };

        const rzp = new Razorpay(this.options);
        console.log("email is :",this.email);
        console.log("property id is while: ",this.propertyId);
        console.log("Seller Id is ",this.sellerId);
        rzp.open();

        rzp.on('payment.failed', (response: any) => {
          console.log("Payment failed:", response);
          self.error = response.error.reason;
        });
      },
      (err: any) => {
        this.error = err.error.message;
        console.log("Error creating order:", err);
      }
    );
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    const detail = event.detail;
    const propertyId = parseInt(localStorage.getItem("propId"));
    //const amount = detail.amount;
    const token = 'Bearer ' + localStorage.getItem(this.TOKEN_KEY);
    const headers = new HttpHeaders().set('Authorization', token);

    const url = `http://localhost:9091/properties/buy/${this.propertyId}?amount=${this.amount}&email=${this.email}&userId=${this.userId}&propId=${this.propertyId}&sellerId=${this.sellerId}`;

    this.http.post(url, {}, { headers,responseType: 'text' as 'json' }).subscribe({
      next: (response: any) => {
        console.log("Property purchase success:", response);
        this.show = true;
        this.response = response;
      },
      error: (error: any) => {
        console.log("Error while purchasing property:", error);
      },
      complete: () => {
        console.log("Request completed");
      }
    });
  }
}
