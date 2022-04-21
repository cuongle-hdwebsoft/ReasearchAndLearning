Vue.component("button-component", {
  props: ["title"],
  data: function () {
    return {
      count: 0,
    };
  },
  template: "<button>{{ title }} {{ count }}</button>",
  beforeCreate: function () {
    console.log("button-component beforeCreate");
  },
  created: function () {
    console.log("button-component created");
  },
  beforeMount: function () {
    console.log("button-component beforeMount");
  },
  mounted: function () {
    console.log("button-component mounted");
  },
});
