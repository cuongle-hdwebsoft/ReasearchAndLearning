<template>
  <v-radio-group :label="label">
    <v-radio
      v-model="value"
      v-for="item in items"
      :key="item.id"
      :label="item[labelTextItem]"
      :value="item[valueItem]"
      :error="v[name] && v[name].$error ? v[name].$error : null"
      :error-messages="
        v[name] && v[name].$errors && v[name].$errors.length > 0
          ? v[name].$errors.map((e) => e.$message)
          : []
      "
    ></v-radio>
  </v-radio-group>
</template>

<script setup>
import { defineProps, ref, watchEffect, getCurrentInstance } from "vue";

const props = defineProps([
  "label",
  "labelTextItem",
  "valueItem",
  "items",
  "name",
  "v",
  "modelValue",
]);

const value = ref(props.modelValue);

const component = getCurrentInstance();

watchEffect(function () {
  component.emit("update:modelValue", value);
});
</script>

<style>
</style>