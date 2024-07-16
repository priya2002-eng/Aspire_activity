export interface Product {
  id: number;
  name: string;
  brand: string;
  shortDescription: string;
  image: string;
  rating: number;
  price: number;
  majorCategory: string;
  minorCategory: string;
  specifications: { key: string, value: string }[];
  reviews: { username: string, rating: number, comment: string }[];
  colors: string[];
  sizes: string[];
  quantity?: number;
  color?: string; 
  size?: string;
}
