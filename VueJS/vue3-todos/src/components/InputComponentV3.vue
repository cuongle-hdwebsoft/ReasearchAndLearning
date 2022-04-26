<template>
  <div>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<script>
</script>