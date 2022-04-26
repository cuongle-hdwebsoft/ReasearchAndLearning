<template>
  <button>button-component</button>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  title: String,
  content: String,
});
</script>

<script>
export default {
  setup(props, ctx) {
    console.log(props, ctx);
  },
  beforeCreate: function () {
    console.log("button-component beforeCreate");
  },
  created: function () {
    console.log("button-component created");
  },
  beforeMount: function () {
    console.log("button-component beforeMount");
  },
  mounted: function () {
    console.log("button-component mounted");
  },
};
</script>