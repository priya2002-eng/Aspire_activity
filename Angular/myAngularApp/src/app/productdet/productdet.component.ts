import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-productdet',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './productdet.component.html',
  styleUrl: './productdet.component.css'
})
export class ProductdetComponent {
  productdata: any;

  constructor(private service: ProductService){}

  ngOnInit(){
    this.service.getAllProducts().subscribe((data)=>{
      this.productdata = data;
      console.log("fetched");
      
    })
  }
}

