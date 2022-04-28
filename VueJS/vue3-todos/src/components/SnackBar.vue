<template>
  <v-snackbar :color="type" v-model="value" :timeout="-1">{{
    content
  }}</v-snackbar>
</template>

<script>
export default {
  props: ["content", "type"],
  data: function () {
    return {
      value: true,
    };
  },
};
</script>

<style>
</style>