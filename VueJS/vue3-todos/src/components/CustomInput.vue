
<template>
  <v-text-field
    v-bind="component.attrs"
    :suffix="suffix"
    variant="outlined"
    :label="label"
    v-model="valueInput"
    @blur="vName && vName.$touch ? vName.$touch : null"
    :error="vName && vName.$error ? vName.$error : null"
    :error-messages="
      vName && vName.$errors && vName.$errors.length > 0
        ? vName.$errors.map((e) => e.$message)
        : []
    "
  ></v-text-field>
</template>

<script setup>
import { defineProps, watch, getCurrentInstance, computed } from "vue";
import { nestedKeyValue } from "../utils/nestedKeyValue";

const props = defineProps(["label", "modelValue", "v", "name", "suffix"]);
const valueInput = computed(() => props.modelValue);
const component = getCurrentInstance();

watch(valueInput, () => {
  component.emit("update:modelValue", valueInput.value);
});

const vName = computed(() => nestedKeyValue(props.name, props.v));
</script>
