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
      <div class="product__button-group">
        <button>Add to cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps(["product"]);
</script>
<script>
export default {};
</script>

<style lang="scss">
.product {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin: 20px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;

  &__img {
    width: 100%;
    height: 110px;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }

  &__button-group {
    margin-top: 10px;
    display: flex;
    justify-content: center;

    & button {
      outline: none;
      background-color: $green;
      color: #fff;
      border: none;
      padding: 5px;
      border-radius: 5px;
      font-size: 0.9rem;

      cursor: pointer;
    }
  }
}
</style>