import type { CartItem } from "./cart";

export interface Product {
  readonly id: string,
  image: string,
  name: string, 
  rating: Rating,
  pricePaisa: number
}

export interface Rating {
  stars: number,
  count: number
}

export interface ProductsGridProps {
  setDisplayStatus: React.Dispatch<React.SetStateAction<string>>;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
}

export interface ProductCardProps {
  product: Product,
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
}