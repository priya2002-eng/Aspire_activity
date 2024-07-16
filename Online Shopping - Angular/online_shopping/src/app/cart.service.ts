import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CartItem } from './cart/cart.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {

   private apiUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getCartItems(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}?userId=${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  addToCart(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.apiUrl, item).pipe(
      catchError(this.handleError)
    );
  }

  updateCartItem(item: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.apiUrl}/${item.id}`, item).pipe(
      catchError(this.handleError)
    );
  }

  removeCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  clearCart(userId: number): Observable<void[]> {
    return this.getCartItems(userId).pipe(
      switchMap(items => forkJoin(items.map(item => this.removeCartItem(item.id)))),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
export { CartItem };

