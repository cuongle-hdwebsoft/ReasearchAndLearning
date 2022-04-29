<template>
  <div class="header">
    <div class="header__logo">
      <img
        class="header__img"
        src="http://assets.stickpng.com/images/58482acecef1014c0b5e4a1e.png"
      />
    </div>
    <ul class="header__navbar">
      <li class="header__navbar-item">
        <router-link class="header__navbar-link" to="/">Trang chủ</router-link>
      </li>
      <li>
        <router-link class="header__navbar-link" to="/product/create"
          >Create products</router-link
        >
      </li>
      <li>
        <router-link class="header__navbar-link" to="/login">Login</router-link>
      </li>
    </ul>
  </div>
  <div class="container">
    <router-view></router-view>
  </div>
  <snackbar-container></snackbar-container>
</template>

<script>
import SnackbarContainer from "../components/SnackbarContainer.vue";
export default {
  components: {
    SnackbarContainer,
  },
};
</script>

<style lang="scss">
.header {
  padding: 10px;
  display: flex;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: fixed;
  width: 100%;
  z-index: 999;
  height: 80px;
  top: 0;
  background-color: #fff;

  &__img {
    // width: 800px;
    height: 50px;
    color: $green !important;
  }

  &__navbar {
    display: flex;
    list-style: none;
    margin-left: auto;
  }

  &__navbar-link {
    text-decoration: none;
    padding: 8px 18px;
  }
}

.container {
  width: 80%;
  margin: 80px auto 0px auto;
}
</style>