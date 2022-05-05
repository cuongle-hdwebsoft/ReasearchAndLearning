


<template>
  <div>TestComponent</div>
  <div>name: {{ name }}</div>
  <div>age: {{ age }}</div>
  <div>friends: {{ friends.join(",") }}</div>
  <div>object: {{ JSON.stringify(object) }}</div>
  <div>_name: {{ _name }}</div>
  <div>_age: {{ _age }}</div>
  <div>_friends: {{ _friends.join(",") }}</div>
  <div>_mom.name: {{ _mom.name }}</div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-setup-props-destructure */

import { computed, defineProps, getCurrentInstance, watch } from "vue";

const props = defineProps([
  "name",
  "age",
  "friends",
  "object",
  "_name",
  "_age",
  "_friends",
  "_mom",
]);
const component = getCurrentInstance();

const name = computed({
  get() {
    return props.name;
  },
}); // listening after update
const age = computed(() => props.age);
const friends = props.friends;
const object = props.object;

const _age = props._age;
const _name = props._name;
const _friends = props._friends;
const _mom = props._mom;

watch(props, function () {
  console.log("watch props", props);
});
</script>

<style>
div {
  cursor: pointer;
}
</style>