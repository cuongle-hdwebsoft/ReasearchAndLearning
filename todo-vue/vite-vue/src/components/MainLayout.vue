<template>
  <div>
    <header>
      <nav>
        <ul>
          <li>Home</li>
          <li>News</li>
          <li>Login</li>
        </ul>
      </nav>
    </header>
    <div class="container">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
};
</script>

<style>
</style>