<template>
  <div></div>
</template>

<script setup>
const {
  createVNode,
  getCurrentInstance,
  onMounted,
} = require("@vue/runtime-core");
const { render } = require("@vue/runtime-dom");
const component = getCurrentInstance();

// https://stackoverflow.com/questions/69488256/vue-3-append-component-to-the-dom-best-practice

onMounted(function () {
  console.log(document);
  let app = document.getElementById("app");
  let node = document.createElement("div");
  app.appendChild(node);
  let t = null;

  let toast = async function ({ content, type }, delay) {
    let vnode = createVNode((await import("./SnackBar.vue")).default, {
      content,
      type,
    });
    vnode.appContext = { ...component.appContext };
    render(vnode, node);

    if (t) {
      clearTimeout(t);
    }

    t = setTimeout(() => {
      render(null, node);
      vnode = undefined;
    }, delay || 3000);
  };

  window.toast = toast;
});
</script>

<style>
</style>