import { HttpClient } from '@angular/common/http';
import id from '@angular/common/locales/id';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:9091/bookings';

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/getAll`);
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/get/${id}`);
  }

  createBooking(booking: Booking): Observable<string> {
    return this.http.post(`${this.baseUrl}/createbooking`, booking, { responseType: 'text' });
  }

  updateBookingStatus(id: number, booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.baseUrl}/${id}`, booking);
  }

  deleteBooking(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }


  getBookingsByUserId(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/getAllByUserId/${userId}`);
  }

  getBookingsBySellerId(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/getAllBySellerId/${userId}`);
  }


}