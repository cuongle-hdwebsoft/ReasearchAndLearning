<template>
  <header class="header">
    <ul class="navbar">
      <li class="navbar__item">
        <router-link class="navbar__link" to="/">Home</router-link>
      </li>
      <li class="navbar__item">
        <router-link class="navbar__link" to="/news">News</router-link>
      </li>
      <li class="navbar__item">
        <router-link class="navbar__link" to="/login">Login</router-link>
      </li>
    </ul>
  </header>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>

</style>