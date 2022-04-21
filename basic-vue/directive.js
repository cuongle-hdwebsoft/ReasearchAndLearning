Vue.directive("global-directive", {
  inserted: function (el, binding, vnode, oldNode) {
    console.log("el, binding, vnode, oldNode", el, binding, vnode, oldNode);
  },
});
