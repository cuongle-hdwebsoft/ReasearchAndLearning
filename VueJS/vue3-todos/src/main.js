import { createApp } from "vue";
import App from "./App.vue";
import Page1Component from "./pages/Page1Component";
import Page2Component from "./pages/Page2Component";
import * as VueRouter from "vue-router";
import firstPlugin from "./plugins/FirstPlugin";

const routes = [
  {
    path: "/page1",
    component: Page1Component,
  },
  {
    path: "/page2",
    component: Page2Component,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(firstPlugin);
app.mount("#app");
