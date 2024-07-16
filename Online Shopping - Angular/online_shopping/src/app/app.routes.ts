import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ReviewComponent } from './review/review.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderHistoryComponent } from './order-history/order-history.component';


export const routes: Routes = [
    { 
        path: 'signup', 
        component: SignupComponent 
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'home', 
        component: HomeComponent 
    },
    { 
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full' 
    }, 
    { 
        path: 'products', 
        component: ProductComponent
    },
    { 
        path: 'productdetails/:id', 
        component: ProductDetailsComponent
    },
    {
         path: 'cart', 
         component: CartComponent 
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
        children: [
            { path: '', redirectTo: 'shipping', pathMatch: 'full' },
            { path: 'shipping', component: ShippingComponent },
            { path: 'payment', component: PaymentComponent },
            { path: 'review', component: ReviewComponent }
        ]
    },
    { 
        path: 'order-history', 
        component: OrderHistoryComponent 
    }
];
