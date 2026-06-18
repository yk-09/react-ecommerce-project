import type { Product } from "../types/product";
import axios from "axios";

const BASE_URL =
  'https://69ada80eb50a169ec87fef13.mockapi.io/products';

export async function getProductsBackend() {
  const res = await axios.get<Product[]>(BASE_URL);
  return res.data;
}