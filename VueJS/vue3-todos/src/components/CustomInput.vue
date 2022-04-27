
<template>
  <v-text-field
    variant="outlined"
    :label="label"
    v-model="valueInput"
    @blur="v[name].$touch"
    :error="v[name].$error"
    :error-messages="
      v[name].$errors.length > 0 ? v[name].$errors.map((e) => e.$message) : []
    "
  ></v-text-field>
</template>

<script setup>
import { defineProps, ref, watch, getCurrentInstance } from "vue";

const props = defineProps(["label", "modelValue", "v", "name"]);
const valueInput = ref(props.modelValue);
const component = getCurrentInstance();

watch(valueInput, () => {
  component.emit("update:modelValue", valueInput.value);
});
</script>
