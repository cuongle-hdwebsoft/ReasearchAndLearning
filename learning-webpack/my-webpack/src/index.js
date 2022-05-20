import { createApp } from 'vue';
import App from './App.vue';
import './assets/style.css';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import News from './pages/News.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  routes: [
    { path: '/', component: HomePage },
    { path: '/news', component: News },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ],
  history: createWebHashHistory()
})

const app = createApp(App);
app.use(router)
app.mount('#app');