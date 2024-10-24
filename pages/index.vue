<template>
  <div class="catalog">
    <h1>Product Catalog</h1>

    <h1 v-if="loading">Loading products...</h1>

    <div class="product-grid">
      <NuxtLink
        v-for="product in products"
        :key="product?.id"
        :to="`/product/${product?.id}`"
      >
        <div class="product-card">
          <img :src="product?.thumbnail" :alt="product?.title" />
          <h2>{{ product?.title }}</h2>
          <p>{{ product?.price }} USD</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProductStore } from "~/stores/productStore";

const store = useProductStore();
const { products, loading, fetchProducts } = store;

onMounted(() => {
  if (products.length === 0) {
    fetchProducts();
  }
});
</script>

<style scoped lang="scss">
.catalog {
  text-align: center;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.product-card {
  border: 1px solid #eee;
  padding: 1rem;
  transition: transform 0.2s;
}
.product-card:hover {
  transform: scale(1.05);
}
</style>
