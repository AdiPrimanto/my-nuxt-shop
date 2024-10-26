<template>
  <template v-if="product">
    <div class="product-detail">
      <NuxtLink to="/">← Back to Catalog</NuxtLink>

      <div class="product-info">
        <div class="product-info__detail">
          <img :src="product?.thumbnail" :alt="product?.title" />
          <div class="product-info__desc">
            <h2 class="product-info__title">{{ product?.title }}</h2>
            <p class="product-info__price">{{ product?.price }} USD</p>
            <p>{{ product?.description }}</p>
            <div class="product-info__information">
              <p>{{ product?.rating }} ⭐</p>
              <div class="product-info__information-detail">
                <p>{{ product?.stock }} tersisa</p>
                <p
                  v-if="product?.discountPercentage"
                  class="product-info__discount"
                >
                  {{ product?.discountPercentage }}%
                </p>
              </div>
            </div>
            <div class="tags">
              <span v-for="tag in product?.tags" :key="tag" class="tag">{{
                tag
              }}</span>
            </div>
          </div>
        </div>

        <h2>Reviews</h2>
        <div v-if="product?.reviews.length === 0">No reviews yet.</div>
        <div
          v-else
          v-for="review in product?.reviews"
          :key="review.date"
          class="review"
        >
          <div class="product-info__review-rating">
            <div>
              <template v-for="item in review.rating"> ⭐ </template>
            </div>

            <div>{{ new Date(review.date).toLocaleDateString() }}</div>
          </div>
          <p>
            <strong>{{ review.reviewerName }}</strong> <br />
            {{ review.comment }}
          </p>
        </div>
      </div>
    </div>
  </template>

  <template v-else>
    <div class="product-loading">
      <div v-for="item in 5" class="skaleton"></div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import type { Product } from "~/types/product";

useHead({
  title: "Detail Product Catalog",
});

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
