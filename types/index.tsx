export interface Category {
  id: string;
  title: string;
  desc: string;
  slug: string;
  img: string;
  color: string;
}

export interface ProductOption {
  title: string;
  additionalPrice: number;
}

export interface Product {
  id: string;
  title: string;
  desc: string;
  img?: string;
  price: number;
  isFeatured: boolean;
  options: ProductOption[];
  catSlug: string;
  category?: Category;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedOption?: string;
  totalPrice: number;
}

export interface Order {
  id: string;
  createdAt: string;
  price: number;
  products: CartItem[];
  status: string;
}
export type MenuType = {
  id: number;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
}[];