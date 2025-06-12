import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class OrderService {
  downloadInvoice(id: number) {
    throw new Error('Method not implemented.');
  }

	constructor(private http: HttpClient) { }

	createOrder(order: { name: any; email: any; phone: any; amount: any; userId: any; propertyId: number }): Observable<any> {
		return this.http.post("http://localhost:9091/pg/createOrder", {
			customerName: order.name,
			email: localStorage.getItem("email"),
			phoneNumber: order.phone,
			amount: order.amount,
			userId: localStorage.getItem("userId"),
			propertyId: localStorage.getItem("propertyId")
		}, httpOptions);
	}

	getBySellerId(sellerId: number): Observable<any[]> {
		return this.http.get<any[]>(`http://localhost:9091/pg/getBySellerId/${sellerId}`);
	}

	getByBuyerId(buyerId: number): Observable<any[]> {
		return this.http.get<any[]>(`http://localhost:9091/pg/getByBuyerId/${buyerId}`);
	}


}