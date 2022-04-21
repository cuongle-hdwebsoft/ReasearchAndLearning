import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import NewsPage from "./pages/NewsPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import BlogPage from "./pages/BlogPage.vue";
import PostDetailPage from "./pages/PostDetailPage.vue";
import PostDetail from "./pages/PostDetail.vue";
import PostEdit from "./pages/PostEdit.vue";
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
      path: "/blogs/:id",
      component: PostDetailPage,
      children: [
        {
          path: "",
          component: PostDetail,
        },
        {
          path: "edit",
          component: PostEdit,
        },
      ],
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
