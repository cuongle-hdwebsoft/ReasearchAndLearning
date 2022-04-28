
<template>
  <div>
    <h1>Product Detail Page</h1>
    <form @submit="handleSubmit" class="form">
      <div class="form-item">
        <custom-input
          :v="v$"
          v-model="imageUrl"
          name="imageUrl"
          label="Image url"
        ></custom-input>
        <custom-input
          :v="v$"
          v-model="productName"
          name="productName"
          label="Product name"
        ></custom-input>
      </div>
      <div class="form-item">
        <custom-input
          :v="v$"
          v-model="price"
          name="price"
          label="Price"
          type="number"
          suffix="$"
        ></custom-input>
      </div>
      <div class="form-item">
        <custom-input
          :v="v$"
          v-model="amount"
          name="amount"
          label="Amount"
          type="number"
          suffix="$"
        ></custom-input>
      </div>
      <div class="form-item">
        <custom-combobox
          :v="v$"
          :items="categories"
          v-model="categoryName"
          name="categoryName"
          :clearable="true"
          itemText="name"
          itemValue="value"
        />
      </div>
      <div class="form-item">
        <custom-switch v-model="isActive" label="Active" :v="v$" />
      </div>
      <div class="form-item">
        <custom-radios
          name="inStock"
          :v="v$"
          label="Is Product in stock?"
          labelTextItem="name"
          valueItem="value"
          :items="[
            { name: 'In stock', value: true },
            { name: 'Not in stock', value: false },
          ]"
        ></custom-radios>
      </div>
      <div class="form-item">
        <v-btn type="submit" variant="outlined">Click</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import CustomInput from "../components/CustomInput.vue";
import CustomCombobox from "../components/CustomCombobox.vue";
import CustomSwitch from "../components/CustomSwitch.vue";
import CustomRadios from "../components/CustomRadios.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minValue, numeric } from "@vuelidate/validators";
import { useGetCategories } from "@/modules/products/hooks/useGetCategories";
export default {
  components: {
    CustomInput,
    CustomCombobox,
    CustomSwitch,
    CustomRadios,
  },
  setup() {
    const { categories } = useGetCategories();

    return {
      v$: useVuelidate(),
      categories,
    };
  },
  data: function () {
    return {
      imageUrl: "",
      productName: "",
      price: "",
      inStock: false,
      amount: "",
      categoryName: "",
      isActive: true,
    };
  },
  validations: function () {
    return {
      imageUrl: {
        required: helpers.withMessage("Image url cannot be empty", required),
      },
      productName: {
        required: helpers.withMessage("Product name cannot be empty", required),
      },
      price: {
        required: helpers.withMessage("Price cannot be empty", required),
        minValue: minValue(1),
        numeric,
      },
      amount: {
        required: helpers.withMessage("Amount cannot be empty", required),
        minValue: minValue(1),
        numeric,
      },
      categoryName: {
        required: helpers.withMessage(
          "Category Name cannot be empty",
          required
        ),
      },
    };
  },
  methods: {
    handleSubmit: async function () {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      console.log({
        imageUrl: this.imageUrl,
        productName: this.productName,
        price: this.price,
        inStock: this.inStock,
        amount: this.amount,
        categoryName: this.categoryName,
        isActive: this.isActive,
      });
    },
  },
};
</script>

<style lang="scss">
.form-item {
  margin-bottom: 5px;
}

.form {
  margin: 20px 0px;
}
</style>