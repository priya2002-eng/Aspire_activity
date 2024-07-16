import { Component, OnInit } from '@angular/core';
import { Order } from './order-history.model';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartItem, CartService } from '../cart.service';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const userId = this.authService.getUserID();

    if (userId) {
      this.orderService.getOrderHistory(userId).subscribe((orders: Order[]) => {
        this.orders = orders;
        this.loadCartItemsForOrders();
      });
    }
  }

  loadCartItemsForOrders(): void {
    const userId = this.authService.getUserID();

    if (userId) {
      this.orders.forEach(order => {
        this.cartService.getCartItems(userId).subscribe((items: CartItem[]) => {
          order.items = items.filter(item => order.items.some(i => i.id === item.id));
          order.items.forEach(item => {
            const cartItem = items.find(cartItem => cartItem.id === item.id);
            if (cartItem) {
              item.image = cartItem.image;
              item.color = cartItem.color;
              item.size = cartItem.size;
            }
          });
        });
      });
    }
  }

   startShopping(): void {
    this.router.navigate(['/home']);
  }

}
