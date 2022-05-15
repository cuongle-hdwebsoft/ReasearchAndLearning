import { createApp } from 'vue'
import App from './App.vue'
import routes from '~custom-route-pages'

console.log(routes)

const router = createRouter({
  routes,
  history: createWebHistory()
})

const app = createApp(App)

app.use(router)

app.mount('#root')