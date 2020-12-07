import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import Firebase from 'firebase'
import { firebaseConfig } from './config/firebaseConfig'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVuejs } from '@fortawesome/free-brands-svg-icons'
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add( faVuejs, faUser, faPowerOff )

Vue.component('font-awesome-icon', FontAwesomeIcon)

Firebase.initializeApp(firebaseConfig);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  Firebase,
  render: h => h(App)
}).$mount('#app')
