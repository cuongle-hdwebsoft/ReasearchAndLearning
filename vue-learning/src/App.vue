<template>
  <MainLayout>
    <router-view></router-view>
  </MainLayout>
</template>

<script>
import MainLayout from "./components/layout/MainLayout.vue";
import "./assets/scss/index.scss";

export default {
  components: {
    MainLayout,
  },
  mounted: function() {
    // console.log(this)
  }
};
</script>
