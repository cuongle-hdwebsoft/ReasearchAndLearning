<template>
  <header class="header">
    <ul class="navbar">
      <li class="navbar__item">
        <a class="navbar__link" href="">Home</a>
      </li>
      <li class="navbar__item">
        <a class="navbar__link" href="">News</a>
      </li>
      <li class="navbar__item">
        <a class="navbar__link" href="">Login</a>
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