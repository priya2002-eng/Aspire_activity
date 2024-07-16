import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShippingAddress } from './shipping.model';
import { catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css'
})
export class ShippingComponent {

  @Output() addressSaved = new EventEmitter<ShippingAddress>();

  newAddress: ShippingAddress = {
    fullName: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    country: ''
  };

  existingAddresses: ShippingAddress[] = [];
  selectedAddressId: string | null = null;
  showAddressForm = false;
  errorMessage: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.loadAddresses();
  }

  loadAddresses(): void {
    const currentUserID = this.authService.getUserID(); // Get the current logged-in user ID
    if (currentUserID) {
      this.http.get<ShippingAddress[]>(`http://localhost:3000/address?userId=${currentUserID}`).subscribe(
        addresses => {
          this.existingAddresses = addresses;
        },
        error => {
          console.error('Failed to load addresses', error);
        }
      );
    } else {
      this.errorMessage = 'User not logged in.';
      this.router.navigate(['/login']); // Redirect to login if user is not logged in
    }
  }

  saveAddress(): void {
    const currentUserID = this.authService.getUserID(); // Get the current logged-in user ID
    if (currentUserID) {
      this.newAddress.userId = currentUserID; // Set the userId in the address

      if (this.validateAddress(this.newAddress)) {
        this.errorMessage = null;
        this.http.post('http://localhost:3000/address', this.newAddress).pipe(
          catchError(err => {
            this.errorMessage = 'Failed to save address. Please try again later.';
            console.error(err);
            return throwError(err);
          })
        ).subscribe({
          next: () => {
            this.addressSaved.emit(this.newAddress);
            this.loadAddresses(); // Reload addresses after saving
            this.showAddressForm = false; // Hide the form after saving
          }
        });
      } else {
        this.errorMessage = 'Please fill in all required fields.';
      }
    } else {
      this.errorMessage = 'User not logged in.';
      this.router.navigate(['/login']); // Redirect to login if user is not logged in
    }
  }

  deliverHere(): void {
    const selectedAddress = this.existingAddresses.find(address => address.id === this.selectedAddressId);
    if (selectedAddress) {
      this.addressSaved.emit(selectedAddress);
      // Add logic to proceed to the next step
    } else {
      this.errorMessage = 'Please select a valid address.';
    }
  }

  validateAddress(address: ShippingAddress): boolean {
    return !!address.fullName && !!address.mobileNumber && !!address.address &&
           !!address.city && !!address.state && !!address.pinCode && !!address.country;
  }

}
