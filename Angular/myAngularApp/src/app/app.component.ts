import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { AccountComponent } from './account/account.component';
import { CommonModule } from '@angular/common';
import { CubePipe } from './cube.pipe';
import { GenderPipe } from './gender.pipe';
import { ShirtSizePipe } from './shirt-size.pipe';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductdetComponent } from './productdet/productdet.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule, FormsModule,CubePipe,GenderPipe,ReactiveFormsModule,ShirtSizePipe,AccountComponent,ProductdetComponent, RouterLink,CommonModule,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myAngularApp';
  joinDate: Date= new Date();
}
