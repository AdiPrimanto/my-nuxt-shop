<template>
  <div class="product-detail">
    <NuxtLink to="/">← Back to Catalog</NuxtLink>
    <div class="product-info">
      <img :src="product?.thumbnail" :alt="product?.title" />
      <p>Price: {{ product?.price }} USD</p>
      <p>Rating: {{ product?.rating }} ⭐</p>
      <p>Category: {{ product?.category }}</p>
      <p v-if="product?.discountPercentage">
        Discount: {{ product?.discountPercentage }}%
      </p>
      <p v-if="product && product?.stock <= 0" class="out-of-stock">
        Out of Stock
      </p>
      <p v-else>Stock: {{ product?.stock }}</p>
      <p>Brand: {{ product?.brand }}</p>
      <div class="tags">
        Tags:
        <span v-for="tag in product?.tags" :key="tag" class="tag">{{
          tag
        }}</span>
      </div>

      <h2>Reviews</h2>
      <div v-if="product?.reviews.length === 0">No reviews yet.</div>
      <div
        v-else
        v-for="review in product?.reviews"
        :key="review.date"
        class="review"
      >
        <p>
          <strong>{{ review.reviewerName }}:</strong>
          {{ review.comment }} (Rating: {{ review.rating }} ⭐)
        </p>
        <p>Date: {{ new Date(review.date).toLocaleDateString() }}</p>
      </div>
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

<style scoped lang="scss"></style>
