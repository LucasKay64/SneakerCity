import type { User } from "@supabase/supabase-js";

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

export interface CartItem extends Product {
  quantity: number;
}

// Type to model the response upon signup and signin with email and password
export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: User;
}
