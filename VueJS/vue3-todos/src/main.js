import { createApp } from "vue";
import App from "./App.vue";
import * as VueRouter from "vue-router";
import * as Vuetify from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import HomePage from "./pages/HomePage.vue";
import ProductDetailPage from "./pages/ProductDetailPage.vue";
import TestPage from "./pages/TestPage.vue";
import store from "./modules/store";

import "vuetify/dist/vuetify.min.css";

const routes = [
  { path: "/", component: HomePage },
  { path: "/product/create", component: ProductDetailPage },
  { path: "/product/:id/edit", component: ProductDetailPage },
  { path: "/test-page", component: TestPage },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(store);
app.use(
  Vuetify.createVuetify({
    components,
    directives,
  })
);

app.mount("#app");
