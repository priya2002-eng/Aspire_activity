import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingComponent } from '../shipping/shipping.component';
import { PaymentComponent } from '../payment/payment.component';
import { ReviewComponent } from '../review/review.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ShippingComponent,PaymentComponent,ReviewComponent, LoginComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  step: number = 1;
  loggedInUser: any = null;

  steps = [
    { title: 'Login' },
    { title: 'Delivery Address' },
    { title: 'Order Summary' },
    { title: 'Payment' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.loggedInUser = user;
        this.step = 2;
      }
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  goToStep(stepNumber: number): void {
    if (stepNumber > this.step) return; // Prevent going to future steps before completing the current step
    this.step = stepNumber;
  }

  onLoginSuccess(user: any): void {
    this.loggedInUser = user;
    this.step = 2;
  }

  onAddressSaved(address: any): void {
    console.log('Address saved:', address);
    this.step = 3;
  }

  onContinueClicked(): void {
    this.step += 1; // Move to the next step after "Continue" button is clicked
  }

  onOrderConfirmed(): void {
    console.log('Order confirmed');
    this.step = 4;
  }

  onPaymentCompleted(): void {
    console.log('Payment completed');
    this.step = 5;
    setTimeout(() => {
      this.router.navigate(['/home']); // Navigate to home page after 3 seconds
    }, 7000); // 3000 milliseconds = 3 seconds
  }
}
