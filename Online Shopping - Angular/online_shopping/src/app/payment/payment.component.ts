import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem, CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Order } from '../order-history/order-history.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  @Output() orderConfirmed = new EventEmitter<void>();
  @Output() paymentConfirmed = new EventEmitter<void>();
  @Input() cartItems: CartItem[] = [];
  @Input() totalDiscountedPrice: number = 0;
  @Input() shippingCost: number = 0;
  @Input() finalPrice: number = 0;

  selectedPaymentOption: string = '';
  paymentOptions = [
    // Payment options data
    { id: 'upi', name: 'UPI', image: '/assets/pay-icon/upi.webp'},
    { id: 'netbanking', name: 'Net Banking', image: '/assets/pay-icon/netbanking.jpg' },
    { id: 'cashondelivery', name: 'Cash on Delivery', image: '/assets/pay-icon/cashes.png' },
    { id: 'atmdebitcard', name: 'ATM/Debit/Credit Card', image: '/assets/pay-icon/cards.png' },
    { id: 'PhonePe', name: 'PhonePe UPI',image: '/assets/pay-icon/phonepe.png' },
  ];

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  confirmOrder(): void {
    if (this.selectedPaymentOption ) {
      const userId = this.authService.getUserID();
      const order: Order = {
        id: this.generateOrderId(),
        userId,
        items: this.cartItems,
        totalPrice: this.totalDiscountedPrice,
        shippingCost: this.shippingCost,
        finalPrice: this.finalPrice,
        orderDate: new Date().toISOString(),
        status: 'Delivered',
        deliveryDate: this.generateRandomDeliveryDate(),

      };

      this.orderService.saveOrder(order).subscribe(() => {
        this.orderConfirmed.emit();
        this.cartService.clearCart(userId).subscribe(() => {
          console.log('Cart cleared successfully.');
        });
      });
      this.paymentConfirmed.emit();
    } else {
      alert('Please select a payment option.');
    }
  }

  generateOrderId(): number {
    return Math.floor(Math.random() * 1000000); // Simple random order ID generator
  }

  generateRandomDeliveryDate(): string {
    const currentDate = new Date();
    const deliveryDays = Math.floor(Math.random() * 10) + 3; // Random delivery between 3 and 12 days
    currentDate.setDate(currentDate.getDate() + deliveryDays);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(currentDate);
  }
}
