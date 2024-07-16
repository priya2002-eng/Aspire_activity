import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  mobile: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signUp() {
    if (!this.name || !this.email || !this.password || !this.mobile) {
      this.errorMessage = 'All fields are required.';
      this.successMessage = '';
      return;
    }

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      mobile: this.mobile
    };

    this.authService.signUp(userData).subscribe(
      (response: any) => {
        this.successMessage = 'Sign-up successful. Redirecting to login page...';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error: string) => {
        this.errorMessage = error;
        this.successMessage = '';
      }
    );
  }
}
