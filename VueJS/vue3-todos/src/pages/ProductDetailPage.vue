
<template>
  <div>
    <h1>Product Detail Page</h1>
    <form class="form">
      <div class="form-item">
        <custom-input
          :v="v$"
          v-model="imageUrl"
          name="imageUrl"
          label="Image url"
        ></custom-input>
        {{ imageUrl }}
        <!-- <input v-model="imageUrl" /> -->
      </div>
      <!-- <div class="form-item">
        <v-text-field
          variant="outlined"
          label="productName"
          v-model="productName"
        ></v-text-field>
      </div>
      <div class="form-item">
        <v-text-field
          variant="outlined"
          label="price"
          v-model="productName"
        ></v-text-field>
      </div>
      <div class="form-item">
        <v-text-field
          variant="outlined"
          label="amount"
          v-model="productName"
        ></v-text-field>
      </div>
      <div class="form-item">
        <v-radio-group v-model="radioGroup">
          <template v-slot:label>
            <strong>Active</strong>
          </template>
          <v-radio
            v-for="r in [
              { name: 'active', value: true },
              { name: 'unactive', value: false },
            ]"
            :key="r.value"
            :label="r.name"
            :value="r.value"
          ></v-radio>
        </v-radio-group>
      </div>
      <div class="form-item">
        <v-combobox
          v-model="select"
          :items="categories.map((c) => c.value)"
          label="Category"
          variant="outlined"
        ></v-combobox>
      </div> -->
      <div class="form-item">
        <v-btn type="submit" variant="outlined">Click</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import CustomInput from "../components/CustomInput.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  components: {
    CustomInput,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data: function () {
    return {
      imageUrl: "",
    };
  },
  validations: function () {
    return {
      imageUrl: {
        required,
      },
    };
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