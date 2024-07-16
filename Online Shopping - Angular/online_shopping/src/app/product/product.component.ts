import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { ProductService } from '../product.service';
import { Product } from './product.model'; // Import the Product interface

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] // Ensure this is styleUrls, not styleUrl
})
export class ProductComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  filteredMinorCategories: { name: string; products: Product[] }[] = [];

  categories: string[] = ['Shoes', 'Cosmetics', 'Accessories', 'Hats'];
  priceRanges: string[] = ['0-500', '500-1000', '1000-2000', '2000+'];

  selectedCategories: { [key: string]: boolean } = {};
  selectedPriceRanges: { [key: string]: boolean } = {};

  constructor(private productService: ProductService, private router: Router) {} // Inject Router

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.initializeFilters();
        this.filterProducts();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  initializeFilters() {
    this.categories.forEach(category => {
      this.selectedCategories[category] = false;
    });
    this.priceRanges.forEach(range => {
      this.selectedPriceRanges[range] = false;
    });
  }

  filterProducts() {
    const isAnyCategorySelected = Object.values(this.selectedCategories).some(value => value);
    const isAnyPriceRangeSelected = Object.values(this.selectedPriceRanges).some(value => value);
    
    let filtered = this.products.filter(product => 
      (!isAnyCategorySelected || this.isCategorySelected(product.majorCategory)) &&
      (!isAnyPriceRangeSelected || this.isPriceRangeSelected(product.price)) 
    );

    this.filteredProducts = filtered;

    this.filteredMinorCategories = [];
    let minorCategories = [...new Set(filtered.map(product => product.minorCategory))];
    minorCategories.forEach(minorCategory => {
      this.filteredMinorCategories.push({
        name: minorCategory,
        products: filtered.filter(product => product.minorCategory === minorCategory)
      });
    });

    // If no category or price range is selected, display all products
    if (!isAnyCategorySelected && !isAnyPriceRangeSelected) {
      this.filteredProducts = this.products;
    }

    console.log('Filtered Minor Categories:', this.filteredMinorCategories);
  }

  isCategorySelected(category: string): boolean {
    return this.selectedCategories[category] || false;
  }

  isPriceRangeSelected(price: number): boolean {
    for (let range in this.selectedPriceRanges) {
      if (this.selectedPriceRanges[range]) {
        let [min, max] = range.split('-').map(Number);
        if ((min <= price && price <= max) || (range === '2000+' && price > 2000)) {
          return true;
        }
      }
    }
    return false;
  }

  getStarRating(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  navigateToProductDetail(productId: number) {
    this.router.navigate(['/productdetails', productId]); // Navigate to product details page
  }
}
