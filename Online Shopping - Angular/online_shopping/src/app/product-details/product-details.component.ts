import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { CartItem, CartService } from '../cart.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'] // Fixed typo: styleUrls instead of styleUrl
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  selectedColor: string | undefined;
  selectedSize: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe(
        (data: Product) => {
          this.product = data;
          this.selectedColor = data.colors[0];
          this.selectedSize = data.sizes[0];
        },
        (error: any) => {
          console.error('Error fetching product', error);
        }
      );
    }
  }

  getStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  addToCart(product: Product): void {
    if (product) {
      const userId = this.authService.getUserID();
      if (userId) {
        const cartItem: CartItem = {
          ...product,
          quantity: 1,
          userId,
          color: this.selectedColor,
          size: this.selectedSize
        };
        this.cartService.addToCart(cartItem).subscribe(
          () => {
            alert('Item added to cart successfully');
            // Optionally, you can navigate to the cart page here
          },
          (error: any) => {
            console.error('Error adding to cart', error);
          }
        );
      } else {
        const confirmLogin = window.confirm('Please login to add item to cart. Do you want to proceed to login?');
        if (confirmLogin) {
          this.router.navigate(['/login']);
        }
        // No action required if the user cancels
      }
    }
  }
  
}
