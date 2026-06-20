import type { DeliveryOptions } from "../types/cart";
import axios from "axios";

export async function getDeliveryOptions() {
  const res =  await axios.get<DeliveryOptions[]>(
    'https://69d1185f90cd06523d5dd7c7.mockapi.io/delivery-options'
  );
  return res.data;
}