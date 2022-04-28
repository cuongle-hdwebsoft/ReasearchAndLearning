
<template>
  <div>
    <h1>Product Detail Page</h1>
    <form
      v-if="(isEdit && product) || !isEdit"
      @submit="handleSubmit"
      class="form"
    >
      <div class="form-item">
        <custom-input
          :v="v$"
          v-model="formValue.imageUrl"
          name="formValue.imageUrl"
          label="Image url"
          :autofocus="true"
          :rounded="true"
        ></custom-input>
        <custom-input
          :v="v$"
          v-model="formValue.productName"
          name="formValue.productName"
          label="Product name"
        ></custom-input>
      </div>
      <div class="form-item">
        <custom-input
          :v="v$"
          v-model="formValue.price"
          name="formValue.price"
          label="Price"
          type="number"
          suffix="$"
        ></custom-input>
      </div>
      <div class="form-item">
        <custom-input
          :v="v$"
          v-model="formValue.amount"
          name="formValue.amount"
          label="Amount"
          type="number"
          suffix="items"
        ></custom-input>
      </div>
      <div class="form-item">
        <custom-combobox
          :v="v$"
          :items="categories"
          v-model="formValue.categoryName"
          name="formValue.categoryName"
          :clearable="true"
          itemText="name"
          itemValue="value"
        />
      </div>
      <div class="form-item">
        <custom-switch
          v-model="formValue.isActive"
          name="formValue.isActive"
          label="Active"
          :v="v$"
        />
      </div>
      <div class="form-item">
        <custom-radios
          v-model="formValue.inStock"
          name="formValue.inStock"
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
        <v-btn :loading="loading" type="submit" variant="outlined">{{
          isEdit ? "Edit" : "Create"
        }}</v-btn>
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
import { useCreateProduct } from "@/modules/products/hooks/useCreateProduct";
import { useGetProductById } from "@/modules/products/hooks/useGetProductById";
import { useEditProduct } from "@/modules/products/hooks/useEditProduct";
import { reactive, ref } from "@vue/reactivity";
import { computed, getCurrentInstance } from "vue";

export default {
  components: {
    CustomInput,
    CustomCombobox,
    CustomSwitch,
    CustomRadios,
  },
  setup() {
    const component = getCurrentInstance();
    const { categories } = useGetCategories();
    const { handleSubmit: submitCreate, isLoading } = useCreateProduct();
    const { handleSubmit: submitEdit } = useEditProduct();
    const { params } = component.appContext.config.globalProperties.$route;
    const isEdit = ref(false);

    let product;

    if (params.id) {
      const data = useGetProductById(params.id);

      product = data.product;

      isEdit.value = true;
    }

    let formValue = null;

    if (isEdit.value === false) {
      formValue = reactive({
        imageUrl: "http://dummyimage.com/181x100.png/cc0000/ffffff",
        productName: "",
        price: "",
        inStock: true,
        amount: "",
        categoryName: "",
        isActive: true,
      });
    } else {
      formValue = computed(() => product.value);
    }

    return {
      v$: useVuelidate(),
      categories,
      submitCreate,
      submitEdit,
      isLoading,
      product,
      isEdit,
      formValue,
    };
  },
  validations: function () {
    return {
      formValue: {
        imageUrl: {
          required: helpers.withMessage("Image url cannot be empty", required),
        },
        productName: {
          required: helpers.withMessage(
            "Product name cannot be empty",
            required
          ),
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
      },
    };
  },
  methods: {
    handleSubmit: async function (e) {
      e.preventDefault();

      const isFormCorrect = await this.v$.$validate();

      console.log(isFormCorrect);

      if (!isFormCorrect) return;

      if (!this.isEdit) {
        await this.submitCreate(
          {
            imageUrl: this.formValue.imageUrl,
            productName: this.formValue.productName,
            price: this.formValue.price,
            inStock: this.formValue.inStock,
            amount: this.formValue.amount,
            categoryName: this.formValue.categoryName,
            isActive: this.formValue.isActive,
          },
          function () {
            this.$router.push("/");
            window.toast({
              content: "Create product successfully",
              type: "success",
            });
          }.bind(this)
        );
      } else {
        await this.submitEdit(
          {
            imageUrl: this.formValue.imageUrl,
            productName: this.formValue.productName,
            price: this.formValue.price,
            inStock: this.formValue.inStock,
            amount: this.formValue.amount,
            categoryName: this.formValue.categoryName,
            isActive: this.formValue.isActive,
            id: this.product.id,
          },
          function () {
            this.$router.push("/");
            window.toast({
              content: "Edit product successfully",
              type: "success",
            });
          }.bind(this)
        );
      }
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