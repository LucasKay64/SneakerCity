export interface Product {
  id: number;
  name: string;
  brand: string;
  collection: string;
  price: number;
  color: string;
  image_url: string;
}

export interface ProductDetails extends Product {
  description: string;
}
