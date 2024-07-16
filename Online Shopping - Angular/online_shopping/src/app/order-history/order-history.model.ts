import { CartItem } from "../cart.service";

export interface Order {
    id?: number; // Make id optional
    userId: number;
    orderDate: string;
    status: 'Delivered' | 'Cancelled';
    items: CartItem[];
    totalPrice: number;
    shippingCost: number;
    finalPrice: number;
    deliveryDate?: string; // Add deliveryDate property
    canceledDate?: string; // Add canceledDate as an optional property
    
  }
  