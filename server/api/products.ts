import axios from "axios";
import type { Product } from "~/types/product";

export default defineEventHandler(async (event) => {
  try {
    const { data } = await axios.get("https://dummyjson.com/products");
    return data.products as Product[];
  } catch (error) {
    return { error: "Failed to fetch products" };
  }
});
