import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink,RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ReviewComponent } from './review/review.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './checkout/checkout.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink,RouterOutlet,FooterComponent,ProductDetailsComponent,ProductComponent,HttpClientModule,
    HomeComponent,CommonModule,SignupComponent,LoginComponent,NavbarComponent, CommonModule,FormsModule,
    ShippingComponent, ReviewComponent,PaymentComponent, CheckoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'online_shopping';
}
