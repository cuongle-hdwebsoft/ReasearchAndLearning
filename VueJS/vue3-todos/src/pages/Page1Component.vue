<template>
  <h1>Page 1</h1>
  <p>Input nhưng two way binding kiểu vue v2</p>
  <input-component
    :value="valueInput"
    @input="(v) => (valueInput = v)"
  ></input-component>
  <p>Input nhưng two way binding kiểu vue v3</p>
  <input-component-v-3 v-model="valueInputV3"></input-component-v-3>
  <p>Pagination component (advance binding multiple)</p>
  <pagination-component
    v-model:page="page"
    v-model:limit="limit"
    :total="total"
    :rowPerPage="rowPerPage"
  ></pagination-component>

  <button-custom></button-custom>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import InputComponent from "../components/InputComponent.vue";
import InputComponentV3 from "../components/InputComponentV3.vue";
import PaginationComponent from "../components/PaginationComponent.vue";

const valueInput = ref("");
const valueInputV3 = ref("");
const limit = ref(10);
const page = ref(1);
const total = ref(15);
const rowPerPage = reactive([1, 2, 4, 6, 8, 10]);

watch([valueInput, valueInputV3], function (newValue, oldValue) {
  console.log("newValue, oldValue", newValue, oldValue);
});

watch([limit, page, total], function (newValue, oldValue) {
  console.log("newValue, oldValue", newValue, oldValue);
});
</script>

<script>
export default {
  name: "Page1Component",
  components: {
    InputComponent,
    InputComponentV3,
  },
};
</script>