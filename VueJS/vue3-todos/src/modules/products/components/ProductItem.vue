<template>
  <div class="product">
    <div class="product__wrap-img">
      <img :src="product.imageUrl" alt="" class="product__img" />
    </div>
    <div class="product__describe">
      <div class="product__title">
        <strong>Product name: </strong>{{ product.productName }}
      </div>
      <div class="product__price">
        <strong>Price: </strong>{{ product.price }}$
      </div>
      <div class="product__category">
        <strong>Category: </strong>{{ product.categoryName }}
      </div>
      <div class="product__category">
        <strong>Amount: </strong>{{ product.amount }} (items)
      </div>
      <div class="product__button-group">
        <v-row align="center" justify="space-around">
          <v-btn @click="handleAddProductToCard(product)" variant="outlined"
            >Add to cart</v-btn
          >
          <v-btn
            @click="$router.push(`/product/${product.id}/edit`)"
            variant="outlined"
            >Edit</v-btn
          >
          <v-btn variant="outlined" color="error">Delete</v-btn>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps(["product"]);
</script>
<script>
export default {
  methods: {
    handleAddProductToCard(p) {
      window.toast({
        content: "Add to cart " + p.productName,
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss">
.product {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin: 10px;
  padding: 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.5s;

  &__img {
    width: 100%;
    height: 110px;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }

  &__button-group {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>