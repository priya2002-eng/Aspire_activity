import { Product } from "../product/product.model";

export interface CartItem extends Product {
  quantity: number;
  userId: number;

  discount?: number;
  discountedPrice?: number;
  deliveryDate?: string;
  canceledDate?: string; // Add canceledDate as an optional property
}

