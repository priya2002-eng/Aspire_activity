import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {  Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categories = [
    { name: 'Shoes', image: '/assets/sneakers.webp' },
    { name: 'Cosmetics', image: '/assets/cosmetics.webp' },
    { name: 'Accessories', image: '/assets/accessories.jpg' },
    { name: 'Hats', image: '/assets/hat.webp' }
  ];
  
  featuredProducts = [
    { name: 'Running Shoes', price: 120, image: '/assets/runningshoes.webp', description: 'Comfortable running shoes', category: 'Shoes' },
    { name: 'Lipstick', price: 25, image: '/assets/lipstick.jpg', description: 'Long-lasting lipstick', category: 'Cosmetics' },
    { name: 'Sunglasses', price: 70, image: '/assets/sunglasses.jpg', description: 'Stylish sunglasses', category: 'Accessories' }
  ];

  promotions = [
    { title: 'Summer Sale', description: 'Up to 50% off!', image: '/assets/sandals.jpg' },
    { title: 'New Arrivals', description: 'Check out the latest products', image: '/assets/watch.jpg' }
  ];

  testimonials = [
    { text: 'Great shopping experience! Fast delivery and excellent customer service.', author: 'Jane Doe' },
    { text: 'Wide variety of products at amazing prices. Highly recommend!', author: 'John Smith' }
  ];

  selectedCategory = '';
  selectedPriceRange = 1000;
  filteredProducts = this.featuredProducts;

  ngOnInit() {
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.featuredProducts.filter(product => {
      return (this.selectedCategory === '' || product.category === this.selectedCategory) &&
             product.price <= this.selectedPriceRange;
    });
  }
}
