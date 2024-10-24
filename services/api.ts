import axios from "axios";
import type { Product } from "~/types/product";

export const fetchProducts = async () => {
  const { data } = await axios.get("https://dummyjson.com/products");
  return data.products as Product[];
};
