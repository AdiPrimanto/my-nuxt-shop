import { defineStore } from "pinia";
// import { fetchProducts } from "~/services/api";
import type { Product } from "~/types/product";

export const useProductStore = defineStore("productStore", () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const response = await $fetch("/api/products");
      products.value = response as Product[];
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    loading,
    fetchProducts,
  };
});
