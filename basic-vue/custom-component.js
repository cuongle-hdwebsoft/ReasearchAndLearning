Vue.component("custom-component", {
  props: {
    value: String,
  },
  model: {
    props: "value",
    event: "input",
  },
  template: `
    <div class='form-item'>
      <input
        v-mydirective
        :value='value'
        placeholder='this is a custom-component'
        v-on:input='$emit("input", $event.target.value)'
      />
    </div>
  `,
  inject: ["provideMethod"],
  mounted: function () {
    // inject variable from parent
    // console.log(this.provideMethod);
  },
  directives: {
    mydirective: {
      bind: function (el, binding, vnode, oldNode) {
        console.log(el);
        el.focus();
      },

      // inserted: function (el, binding, vnode, oldNode) {
      //   console.log(el);
      //   el.focus();
      // },
      // update: function () {},
    },
  },
});
