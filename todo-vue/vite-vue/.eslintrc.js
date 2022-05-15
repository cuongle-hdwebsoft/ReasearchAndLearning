module.exports = {
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-recommended", "prettier"],
  rules: {
    "no-undef": "off",
    "vue/multi-word-component-names": "off",
  },
};
