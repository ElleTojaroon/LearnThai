import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import ltHistory from './components/History.vue'
import About from './components/About.vue'
import GameLevel1 from './components/GameLevel1.vue'
import Navbar from './components/Navbar.vue'

Vue.component('lt-navbar', Navbar)

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Home},
  {path: '/history', component: ltHistory},
  {path: '/about', component: About},
  {path: '/game-level-1', component: GameLevel1}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
