export interface Product {
  id: number;
  category?: string;
  name?: string;
  description?: string;
  price?: string;
  image?: string;
  hover_image?: string;
  created_at?: string;
  updated_at?: string;
  stock?: number;
  new?: string;
  out?: string;
  percentageDiscount?: number;
  old_price?: number;
}

export interface CartItemProps extends Product {
  product: Product;
  id: number;
  product_id?: number;
  user_id?: number;
  quantity: number;
  created_at?: string;
  updated_at?: string;
}

export interface WishlistItemProps extends Product {
  product: Product;
  id: number;
  product_id?: number;
  user_id?: number;
  quantity?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Review {
  id: number;
  productId: number;
  rating: number;
  comment: string;
}

export interface Order {
  id?: number;
  items?: CartItemProps[];
  total?: number;
}

export interface LoginProps {
  email?: string;
  password?: string;
}

export interface RegisterProps extends LoginProps {
  name?: string;
  phone_number?: string;
  address?: string;
}

export interface UserProps extends RegisterProps {
  name?: string;
  phone_number?: string;
  address?: string;
}