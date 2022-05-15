<template>
  <div class="wrapper-root">
    <header>
      <nav class="navbar">
        <ul class="navbar__nav">
          <li class="navbar__item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="navbar__item">
            <router-link to="/news">News</router-link>
          </li>
          <li class="navbar__item">
            <router-link to="/login">Login</router-link>
          </li>
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

<style lang='scss'>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap");

* {
  box-sizing: border-box;
  font-family: "Source Code Pro", monospace;
}

body {
  padding: 0;
  margin: 0;
}

header {
  margin: 0;
}

.wrapper-root {
  margin: 0;
  padding: 0;
}

.navbar {
  padding: 0;
  margin: 0;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  &__nav {
    display: flex;
    list-style: none;
    padding: 12px;
    margin: 2px;
  }

  &__item {
    padding: 10px;
    cursor: pointer;

    & a {
      color: #111;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        font-weight: bold;
      }
    }

    &:last-child {
      margin-left: auto;
    }
  }
}

.container {
  width: 80%;
  margin: auto;
}
</style>