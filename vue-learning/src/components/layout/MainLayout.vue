<template>
  <div class="root-page">
    <div class="header">
      <img class="header__img" src="../../assets/images/logo.png" alt="">

      <ul class="header__nav-bar">
        <li class="header__nav-bar-item">
          <router-link :to="'/'" class="header__nav-bar-link">Home</router-link>
        </li>
        <li class="header__nav-bar-item">
          <router-link :to="'/blogs'" class="header__nav-bar-link">Blogs</router-link>
        </li>
        <li class="header__nav-bar-item">
          <router-link :to="'/news'" class="header__nav-bar-link">News</router-link>
        </li>
        <li class="header__nav-bar-item">
          <router-link :to="'/about'" class="header__nav-bar-link">About</router-link>
        </li>
        <li class="header__nav-bar-item">
          <router-link :to="'/login'" class="header__nav-bar-link">Login</router-link>
        </li>
      </ul>
    </div>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import "./index.scss";
export default {
  data: function() {
    return {
      
    }
  }
};
</script>
