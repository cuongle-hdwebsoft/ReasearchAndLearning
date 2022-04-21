var vm = new Vue({
  data: data,
  el: "#app",
  beforeCreate: function () {
    console.log("App beforeCreate");
  },
  created: function () {
    console.log("App created");
  },
  beforeMount: function () {
    console.log("App beforeMount");
  },
  mounted: function () {
    console.log("App mounted");

    // this.$refs["button-component"].count ref xong thay đổi luôn data
    // this.$refs["button-component"].count =
    //   this.$refs["button-component"].count + 1;
  },
  updated: function () {
    console.log("App supdated");
  },
  computed: {
    calculateYear: function () {
      return new Date().getFullYear() - this.age;
    },
  },
  methods: {
    calculateYearMethod: function () {
      return new Date().getFullYear() - this.age;
    },
    alertMe: function (id) {
      console.log(id);
      console.log(event);
      // alert("alert post id = " + id);
    },
    provideMethod: function () {
      alert("alert provideMethod");
    },
  },
  watch: {
    name: function (newValue, preValue) {
      console.log("watching name");
    },
  },
  provide: function () {
    return {
      provideMethod: this.provideMethod,
    };
  },
});
