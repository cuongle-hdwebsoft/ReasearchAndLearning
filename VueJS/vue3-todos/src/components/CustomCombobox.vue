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
    @blur="vName && vName.$touch ? vName.$touch : null"
    :error="vName && vName.$error ? vName.$error : null"
    :error-messages="
      vName && vName.$errors && vName.$errors.length > 0
        ? vName.$errors.map((e) => e.$message)
        : []
    "
  ></v-select>
</template>

<script setup>
import { defineProps, watch, getCurrentInstance, computed } from "vue";
import { nestedKeyValue } from "@/utils/nestedKeyValue";

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

const value = computed(() => props.modelValue);

const component = getCurrentInstance();

watch(value, function (newValue) {
  component.emit("update:modelValue", newValue);
});

const vName = computed(() => nestedKeyValue(props.name, props.v));
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<style>
</style>