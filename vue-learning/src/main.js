import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import NewsPage from "./pages/NewsPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import BlogPage from "./pages/BlogPage.vue";
import NotFound from "./pages/NotFound.vue";

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/about",
      component: AboutPage,
    },
    {
      path: "/login",
      component: LoginPage,
    },
    {
      path: "/news",
      component: NewsPage,
    },
    {
      path: "/blogs",
      component: BlogPage,
    },
    {
      path: "*",
      component: NotFound,
    },
  ],
  mode: "history",
});

Vue.use(VueRouter);

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount("#app");
