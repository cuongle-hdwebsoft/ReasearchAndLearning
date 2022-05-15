import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import routes from "~custom-route-pages";
import store from "./stores/index";
import "./assets/scss/_variables.scss";

const router = createRouter({
  routes,
  history: createWebHistory(),
});

const app = createApp(App);

app.use(router);
app.use(createStore(store));
app.config.performance = true;

app.mount("#root");
