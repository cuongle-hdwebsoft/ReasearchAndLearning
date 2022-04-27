<template>
  <h1>Products</h1>
  <div class="row">
    <div v-for="product in products" :key="product.id" class="col-3">
      <product-item :product="product"></product-item>
    </div>
  </div>
  <v-pagination
    v-model="page"
    :length="Math.ceil(total / limit)"
    rounded="circle"
  ></v-pagination>
</template>

<script setup>
import { useGetProducts } from "../modules/products/hooks/useGetProducts";
import ProductItem from "../modules/products/components/ProductItem.vue";
import { isReactive, isRef } from "@vue/reactivity";

// eslint-disable-next-line no-unused-vars
const { products, page, limit, total } = useGetProducts();

console.log(isReactive(products), isRef(products));
</script>
<script>
export default {
  mounted: function () {
    console.log(this);
  },
};
</script>