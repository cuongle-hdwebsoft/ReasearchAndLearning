import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueMoment from "vue-moment";

import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import NewsPage from "./pages/NewsPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import BlogPage from "./pages/BlogPage.vue";
import PostDetailPage from "./modules/pages/PostDetailPage.vue";
import PostDetail from "./modules/pages/PostDetail.vue";
import PostEdit from "./modules/pages/PostEdit.vue";
import CustomFormPage from "./pages/CustomFormPage.vue";
import NotFound from "./pages/NotFound.vue";

// directive
import validator from "./directives/validator";

// filters
import currency from "./filters/currency";

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
      path: "/custom-form-binding",
      component: CustomFormPage,
    },
    {
      path: "*",
      component: NotFound,
    },
  ],
  mode: "history",
});

Vue.use(VueRouter);
Vue.use(VueMoment);

Vue.directive("validator", validator);

Vue.filter("currency", currency);

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount("#app");
