import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
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
// import VoiceVisualizer from './components/VoiceVisualizer.vue'
// import AudioPlayer from './components/AudioPlayerOriginal2.vue'
import AudioPlayerOriginal from './components/AudioPlayerOriginal.vue'
import AudioAlone from './components/AudioAlone.vue'

Vue.component('lt-navbar', Navbar)
Vue.component('lt-history-row', HistoryRow)
Vue.component('lt-game-box', GameBox)
Vue.component('lt-game-level1', GameLevel1)
Vue.component('lt-game-level2', GameLevel2)
Vue.component('lt-audio-visualizer', AudioPlayerOriginal)
// Vue.component('lt-audio-visualizer', VoiceVisualizer)

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueResource)

const routes = [
  {path: '/', component: Home},
  {path: '*/history', component: ltHistory},
  {path: '*/about', component: About},
  {path: '*/game/currLevel', component: Game},
  {path: '/game/:level', name: 'game', component: Game, props: true},
  // {path: '/audio', component: VoiceVisualizer},
  // {path: '/audio-player', component: AudioPlayer},
  {path: '*/audio-player2', component: AudioPlayerOriginal},
  {path: '*/audio-alone', component: AudioAlone}
]

const router = new VueRouter({
  routes,
  base: __dirname,
  mode: 'history'
})

new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')

Vue.config.devtools = true