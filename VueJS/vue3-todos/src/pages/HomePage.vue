<template>
  <h1>Products</h1>
  <product-filter v-model:filter="filter"></product-filter>
  <div class="row">
    <template v-if="!isLoading">
      <div v-for="product in products" :key="product.id" class="col-3">
        <product-item :product="product"></product-item>
      </div>
    </template>
    <template v-else>
      <div style="display: flex; justify-content: center">
        <v-progress-circular indeterminate color="green"></v-progress-circular>
      </div>
    </template>
  </div>
  <div class="row" v-if="!isLoading">
    <v-pagination
      v-model="page"
      :length="total"
      rounded="circle"
    ></v-pagination>
    <div style="width: 100px">
      <v-combobox
        label="Limit"
        :items="[4, 8, 12, 16]"
        v-model="limit"
      ></v-combobox>
    </div>
  </div>
</template>

<script setup>
import { useGetProducts } from "../modules/products/hooks/useGetProducts";
import { useGetProductFilter } from "../modules/products/hooks/useGetProductFilter";
import ProductItem from "../modules/products/components/ProductItem.vue";
import ProductFilter from "../modules/products/components/ProductFilter.vue";

const { filter, page, limit } = useGetProductFilter();
const { products, total, isLoading } = useGetProducts(page, limit, filter);
</script>
<script>
export default {
  components: {
    ProductItem,
    ProductFilter,
  },
};
</script>