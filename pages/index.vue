<template>
  <div class="catalog">
    <h1>Product Catalog</h1>

    <div v-if="loading">Loading products...</div>
    <div v-else class="product-grid">
      <NuxtLink
        v-for="product in products"
        :key="product.id"
        :to="`/product/${product.id}`"
      >
        <div class="product-card">
          <img :src="product.thumbnail" :alt="product.title" />
          <h2>{{ product.title }}</h2>
          <p>{{ product.price }} USD</p>
          <p>Category: {{ product.category }}</p>
          <p v-if="product.discountPercentage">
            Discount: {{ product.discountPercentage }}%
          </p>
          <p v-if="product.stock <= 0" class="out-of-stock">Out of Stock</p>
          <p v-else>Stock: {{ product.stock }}</p>
          <p>
            Tags:
            <span v-for="tag in product.tags" :key="tag" class="tag">{{
              tag
            }}</span>
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProductStore } from "~/stores/productStore";

const store = useProductStore();
const products = computed(() => store.products);
const loading = computed(() => store.loading);

onMounted(() => {
  if (store.products.length === 0) {
    store.fetchProducts();
  }
});
</script>
