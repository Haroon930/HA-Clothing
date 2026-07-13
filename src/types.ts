export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'jackets' | 'hoodies' | 'pants';
  price: number;
  compareAtPrice?: number;
  colors: { name: string; hex: string }[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  images: string[]; // references to image assets: front, back, detail, lifestyle
  description: string;
  materials: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string; // Unique ID composed of product.id + size + color
  product: Product;
  selectedColor: { name: string; hex: string };
  selectedSize: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  quantity: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  rating: number;
  location: string;
}
