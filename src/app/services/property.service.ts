import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';
import id from '@angular/common/locales/id';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  //private baseUrl = 'http://localhost:9091/properties';

  constructor(private client: HttpClient) {}

  getProperties(): Observable<Property[]> {
    return this.client.get<Property[]>('http://localhost:9091/properties/fetchAll');
  }

  getPropertyById(id: number): Observable<Property> {
    return this.client.get<Property>(`http://localhost:9091/properties/fetchById/${id}`);
  }

  saveProperty(property: Property): Observable<Property> {
    return this.client.post<Property>('http://localhost:9091/properties/save', property,{responseType:'text' as 'json'});
  }

  updateProperty(property: Property): Observable<Property> {
    return this.client.put<Property>('http://localhost:9091/properties/update', property);
  }

  deleteProperty(id: number): Observable<void> {
    return this.client.delete<void>(`http://localhost:9091/properties/deleteById/${id}`,{ responseType:'text' as 'json'});
  }

  getSoldOutProperties(): Observable<Property[]> {
    return this.client.get<Property[]>('http://localhost:9091/properties/getSoldProperties');
  }

  getPropById(sellerId): Observable<Property[]> {
    console.log(sellerId)
    return this.client.get<Property[]>(`http://localhost:9091/properties/getpropBySellerId/${sellerId}`);
  }
}
