<template>
  <v-select
    v-bind="component.attrs"
    :items="items"
    :item-text="itemText"
    :item-value="itemValue"
    :label="label"
    :clearable="clearable"
    return-object
    v-model="value"
    @blur="v[name] && v[name].$touch ? v[name].$touch : null"
    :error="v[name] && v[name].$error ? v[name].$error : null"
    :error-messages="
      v[name] && v[name].$errors && v[name].$errors.length > 0
        ? v[name].$errors.map((e) => e.$message)
        : []
    "
  ></v-select>
</template>

<script setup>
import { defineProps, ref, watch, getCurrentInstance } from "vue";

const props = defineProps([
  "modelValue",
  "items",
  "itemText",
  "itemValue",
  "label",
  "clearable",
  "name",
  "v",
]);

const value = ref(props.modelValue);

const component = getCurrentInstance();

watch(value, function (newValue) {
  component.emit("update:modelValue", newValue);
});
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<style>
</style>