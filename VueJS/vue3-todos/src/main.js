import { createApp } from "vue";
import App from "./App.vue";
import HomePage from "./pages/HomePage";
import * as VueRouter from "vue-router";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
