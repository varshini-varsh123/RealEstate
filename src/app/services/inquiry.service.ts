import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inquiry } from '../models/inquiry.model';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private baseUrl = 'http://localhost:9091/inquiries';
 
  constructor(private http: HttpClient) {}
 
  getAll(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(`${this.baseUrl}/getAll`);
  }
 
  createInquiry(inquiry: Inquiry): Observable<string> {
return this.http.post(`${this.baseUrl}/create`, inquiry, { responseType: 'text' });
  }
 
  updateResponse(inquiry: Inquiry): Observable<string> {
    return this.http.put(`${this.baseUrl}/updateStatus`, inquiry, { responseType: 'text' });
  }

  getInquiryByUserId(userId: number): Observable<Inquiry[]> {
      return this.http.get<Inquiry[]>(`${this.baseUrl}/getAllByUserId/${userId}`);
    }
    getInquiryBySellerId(userId: number): Observable<Inquiry[]> {
        return this.http.get<Inquiry[]>(`${this.baseUrl}/getAllBySellerId/${userId}`);
      }
}
