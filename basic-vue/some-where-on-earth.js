Vue.component("some-where-on-earth", {
  data: function () {
    return {
      count: 0,
    };
  },
  mounted: function () {
    // console.log(this.$root);
    // console.log(this.$parent);
  },
  methods: {
    handleIncrease: function () {
      this.count++;
    },
  },
  template: `
    <button @click='handleIncrease'>{{ count }}</button>
  `,
});
