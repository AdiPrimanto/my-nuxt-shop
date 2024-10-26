<template>
  <div class="catalog">
    <h1>Product Catalog</h1>

    <div v-if="loading" class="product-loading">
      <div v-for="item in 5" class="skaleton"></div>
    </div>

    <div v-else class="product-grid">
      <NuxtLink
        v-for="product in products"
        :key="product.id"
        :to="`/product/${product.id}`"
      >
        <div class="product-card">
          <img :src="product.thumbnail" :alt="product.title" />
          <div class="product-card__content">
            <h2>{{ product.title }}</h2>
            <p class="price">{{ product.price }} USD</p>

            <div class="stock_wrapper">
              <span class="stock">{{ product.stock }} Tersisa</span>
              <span class="discount"
                >Potongan hingga {{ product.discountPercentage }}%</span
              >
            </div>
          </div>
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
