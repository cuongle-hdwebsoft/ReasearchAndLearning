
<template>
  <v-text-field
    v-bind="component.attrs"
    :suffix="suffix"
    variant="outlined"
    :label="label"
    v-model="valueInput"
    @blur="v[name] && v[name].$touch ? v[name].$touch : null"
    :error="v[name] && v[name].$error ? v[name].$error : null"
    :error-messages="
      v[name] && v[name].$errors && v[name].$errors.length > 0
        ? v[name].$errors.map((e) => e.$message)
        : []
    "
  ></v-text-field>
</template>

<script setup>
import { defineProps, ref, watch, getCurrentInstance } from "vue";

const props = defineProps(["label", "modelValue", "v", "name", "suffix"]);
const valueInput = ref(props.modelValue);
const component = getCurrentInstance();

watch(valueInput, () => {
  component.emit("update:modelValue", valueInput.value);
});
</script>
