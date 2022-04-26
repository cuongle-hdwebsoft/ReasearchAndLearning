<template>
  <input
    v-focus
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps(["value"]);
defineEmits(["input"]);
</script>

<script>
export default {
  name: "input-component",
};
</script>