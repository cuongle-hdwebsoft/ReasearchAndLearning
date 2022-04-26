import ButtonComponent from "../components/ButtonComponent";

const firstPlugin = {
  install: function (app, option) {
    console.log(app, option);

    app.directive("focus", {
      mounted: function (el) {
        el.focus();
      },
    });

    app.component("button-custom", ButtonComponent);

    app.provide("baseUrl", "https://localhost:3000");

    app.config.globalProperties.$test = function () {};
  },
};

export default firstPlugin;
