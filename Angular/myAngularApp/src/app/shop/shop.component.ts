import { Component } from '@angular/core';
import {Shop} from './shop.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  shop:Shop;
  constructor(){
    this.shop=new Shop("Electronics",100,"Chennai");
  }
  showMessage = true;

  items = ['Item 1', 'Item 2', 'Item 3'];

  value = 'B';

  isActive = true;
  isDisabled = false;

  fontSize = 20;

}
