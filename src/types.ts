export interface Product {
    id: number;
    category: string;
    name: string;
    description: string;
    price: string;
    image: string;
    hover_image: string;
    created_at: string;
    updated_at: string;
    stock: number;
    new?: string;
    out?: string;
    percentageDiscount?: number;
    old_price?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: number;
  productId: number;
  rating: number;
  comment: string;
  // Add other relevant fields as per API response
}

export interface Order {
    id: number;
    items: CartItem[];
    total: number;
    // Add other relevant fields as per API response
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps extends LoginProps {
  name: string;
  phone_number: string;
  address: string;
}