import Vue from 'vue'
import VueRouter from 'vue-router'
import _ from 'lodash'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import Home from './components/Home.vue'
import ltHistory from './components/History.vue'
import About from './components/About.vue'
import Game from './components/Game.vue'
import GameBox from './components/GameBox.vue'
import GameLevel1 from './components/GameLevel1.vue'
import GameLevel2 from './components/GameLevel2.vue'
import Navbar from './components/Navbar.vue'
import HistoryRow from './components/HistoryRow.vue'

Vue.component('lt-navbar', Navbar)
Vue.component('lt-history-row', HistoryRow)
Vue.component('lt-game-box', GameBox)
Vue.component('lt-game-level1', GameLevel1)
Vue.component('lt-game-level2', GameLevel2)

Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
  {path: '/', component: Home},
  {path: '/history', component: ltHistory},
  {path: '/about', component: About},
  {path: '/game/:level', component: Game}
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
