<template>
  <div>limit: {{ limit }}</div>
  <div>page: {{ page }}</div>
  <div>total: {{ total }}</div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["limit", "page", "count"]);

// eslint-disable-next-line vue/no-setup-props-destructure
const { limit, page, count } = props;
const total = Math.ceil(count / limit);
</script>

<style>
</style>