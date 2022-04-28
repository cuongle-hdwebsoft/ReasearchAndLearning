<template>
  <v-switch
    v-bind="component.attrs"
    @blur="v[name] && v[name].$touch ? v[name].$touch : null"
    :label="label + ': ' + value"
    :error="v[name] && v[name].$error ? v[name].$error : null"
    :error-messages="
      v[name] && v[name].$errors && v[name].$errors.length > 0
        ? v[name].$errors.map((e) => e.$message)
        : []
    "
    v-model="value"
  ></v-switch>
</template>

<script setup>
import { defineProps, ref, getCurrentInstance, watchEffect } from "vue";

const props = defineProps(["label", "v", "name", "modelValue", "label"]);

const value = ref(props.modelValue);

const component = getCurrentInstance();

watchEffect(function () {
  component.emit("update:modelValue", value);
});
</script>

<style>
</style>