<template>
  <div class="product-detail">
    <NuxtLink to="/">← Back to Catalog</NuxtLink>
    <div class="product-info">
      <img :src="product?.thumbnail" :alt="product?.title" />
      <h1>{{ product?.title }}</h1>
      <p>{{ product?.description }}</p>
      <h2>{{ product?.price }} USD</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import type { Product } from "~/types/product";

const route = useRoute();
const product = ref<Product>();

onMounted(async () => {
  const { data } = await axios.get(
    `https://dummyjson.com/products/${route.params.id}`
  );
  product.value = data;
});
</script>

<style scoped lang="scss">
.product-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-info {
  text-align: center;
}
</style>
