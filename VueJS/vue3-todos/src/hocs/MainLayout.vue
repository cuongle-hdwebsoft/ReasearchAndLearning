<template>
  <div class="header">
    <div class="header__logo">
      <img class="header__img" src="../assets/logo.png" />
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
</template>

<style lang="scss">
.header {
  padding: 10px;
  display: flex;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &__img {
    width: 50px;
    height: 50px;
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
  margin: auto;
}
</style>