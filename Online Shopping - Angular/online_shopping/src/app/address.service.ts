import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShippingAddress } from './shipping/shipping.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = 'http://localhost:3000/address'; // Update with your API URL

  constructor(private http: HttpClient) {}

  getAddresses(userId: string): Observable<ShippingAddress[]> {
    return this.http.get<ShippingAddress[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addAddress(address: ShippingAddress): Observable<ShippingAddress> {
    return this.http.post<ShippingAddress>(this.apiUrl, address);
  }
}
