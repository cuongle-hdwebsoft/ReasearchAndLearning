import { createApp } from "vue";
import App from "./App.vue";
import * as VueRouter from "vue-router";
import * as Vuetify from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import HomePage from "./pages/HomePage.vue";
import store from "./modules/store";

import "vuetify/dist/vuetify.min.css";

const routes = [{ path: "/", component: HomePage }];

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
