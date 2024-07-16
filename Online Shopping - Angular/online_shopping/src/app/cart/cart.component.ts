import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cart.service';
import { Product } from '../product/product.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
   cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const userId = this.authService.getUserID();
    if (userId) {
      this.cartService.getCartItems(userId).subscribe(items => {
        this.cartItems = items;
        this.calculateTotalPrice();
      });
    }
  }

  addToCart(product: Product): void {
    const userId = this.authService.getUserID();
    if (userId) {
      const cartItem: CartItem = { ...product, quantity: 1, userId };
      this.cartService.addToCart(cartItem).subscribe(() => this.loadCartItems());
    }
  }

  updateQuantity(id: number, quantity: number): void {
    const item = this.cartItems.find(item => item.id === id);
    if (item) {
      item.quantity = quantity;
      this.cartService.updateCartItem(item).subscribe(() => this.calculateTotalPrice());
    }
  }

  removeFromCart(id: number): void {
    this.cartService.removeCartItem(id).subscribe(() => this.loadCartItems());
  }

  clearCart(): void {
    const userId = this.authService.getUserID();
    if (userId) {
      this.cartService.clearCart(userId).subscribe(() => this.loadCartItems());
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
