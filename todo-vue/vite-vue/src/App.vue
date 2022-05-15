<template>
  <main-layout>
    <h1>App</h1>
    <router-view></router-view>
  </main-layout>
</template>

<script setup>
import MainLayout from './components/MainLayout.vue'
</script>
<script>
export default {
  components: { MainLayout },

}
</script>

<style>

</style>