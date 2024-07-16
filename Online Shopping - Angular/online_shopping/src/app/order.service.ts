import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order-history/order-history.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:3000/orders'; // Update this with your actual API URL

  constructor(private http: HttpClient) {}

  getOrderHistory(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}?userId=${userId}`);
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }
}
