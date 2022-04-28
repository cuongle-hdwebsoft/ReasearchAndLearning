<template>
  <v-radio-group :label="label" v-model="value">
    <v-radio
      v-bind="component.attrs"
      v-for="item in items"
      :key="item.id"
      :label="item[labelTextItem]"
      :value="item[valueItem]"
      :error="vName && vName.$error ? vName.$error : null"
      :error-messages="
        vName && vName.$errors && vName.$errors.length > 0
          ? vName.$errors.map((e) => e.$message)
          : []
      "
    ></v-radio>
  </v-radio-group>
</template>

<script setup>
import { nestedKeyValue } from "@/utils/nestedKeyValue";
import { defineProps, watchEffect, getCurrentInstance, computed } from "vue";

const props = defineProps([
  "label",
  "labelTextItem",
  "valueItem",
  "items",
  "name",
  "v",
  "modelValue",
]);

const value = computed(() => props.modelValue);

const component = getCurrentInstance();

watchEffect(function () {
  component.emit("update:modelValue", value);
});

const vName = computed(() => nestedKeyValue(props.name, props.v));
</script>

<style>
</style>