<template>
  <v-switch
    v-bind="component.attrs"
    @blur="vName && vName.$touch ? vName.$touch : null"
    :label="label + ': ' + value"
    :error="vName && vName.$error ? vName.$error : null"
    :error-messages="
      vName && vName.$errors && vName.$errors.length > 0
        ? vName.$errors.map((e) => e.$message)
        : []
    "
    v-model="value"
  ></v-switch>
</template>

<script setup>
import { nestedKeyValue } from "@/utils/nestedKeyValue";
import { defineProps, getCurrentInstance, watchEffect, computed } from "vue";

const props = defineProps(["label", "v", "name", "modelValue", "label"]);

const value = computed(() => props.modelValue);

const component = getCurrentInstance();

watchEffect(function () {
  component.emit("update:modelValue", value);
});

const vName = computed(() => nestedKeyValue(props.name, props.v));
</script>

<style>
</style>