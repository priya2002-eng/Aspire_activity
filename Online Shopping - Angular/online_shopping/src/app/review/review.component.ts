import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem, CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {

  @Output() continueClicked = new EventEmitter<{
    cartItems: CartItem[],
    totalDiscountedPrice: number,
    shippingCost: number,
    finalPrice: number
  }>();

  cartItems: CartItem[] = [];
  totalDiscountedPrice: number = 0;
  shippingCost: number = 0;
  finalPrice: number = 0;

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserID();
    if (userId) {
      this.cartService.getCartItems(userId).subscribe(items => {
        this.cartItems = items.map(item => {
          const discount = this.generateRandomDiscount();
          const discountedPrice = this.calculateDiscountedPrice(item.price, discount);
          const deliveryDate = this.generateRandomDeliveryDate();
          return { ...item, discount, discountedPrice, deliveryDate };
        });
        this.calculateTotalPrices();
      });
    }
  }

  calculateTotalPrices(): void {
    this.totalDiscountedPrice = this.cartItems.reduce((total, item) => total + ((item.discountedPrice ?? 0) * item.quantity), 0);
    this.calculateShippingCost();
    this.calculateFinalPrice();
  }

  generateRandomDiscount(): number {
    return Math.floor(Math.random() * 20) + 5; // Random discount between 5% and 25%
  }

  calculateDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }

  generateRandomDeliveryDate(): string {
    const currentDate = new Date();
    const deliveryDays = Math.floor(Math.random() * 10) + 3; // Random delivery between 3 and 12 days
    currentDate.setDate(currentDate.getDate() + deliveryDays);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(currentDate);
  }

  calculateShippingCost(): void {
    this.shippingCost = this.generateRandomShippingCost();
    if (this.shippingCost === 0 || (this.shippingCost > 0 && this.shippingCost < 15)) {
      this.shippingCost = 0;
    }
  }

  generateRandomShippingCost(): number {
    return Math.floor(Math.random() * 41); // Random shipping cost between 0 and 40
  }

  calculateFinalPrice(): void {
    this.finalPrice = this.totalDiscountedPrice + this.shippingCost;
    this.finalPrice = Math.round((this.finalPrice + Number.EPSILON) * 100) / 100;
  }

  placeOrder(): void {
    this.continueClicked.emit({
      cartItems: this.cartItems,
      totalDiscountedPrice: this.totalDiscountedPrice,
      shippingCost: this.shippingCost,
      finalPrice: this.finalPrice,
    });
  }
}
