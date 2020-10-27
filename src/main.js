import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Loader from '@/components/app/Loader'
import messagePlugin from '@/utils/message.plugin'
import dateFilter from '@/filters/date.filter'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.component('Loader', Loader)
Vue.use(messagePlugin)
Vue.use(Vuelidate)

Vue.filter('date', dateFilter)

firebase.initializeApp({
  apiKey: 'AIzaSyCFDIxZiZwnU1QTNwYAlpEy1-yI92uIznU',
  authDomain: 'bec-eng.firebaseapp.com',
  databaseURL: 'https://bec-eng.firebaseio.com',
  projectId: 'bec-eng',
  storageBucket: 'bec-eng.appspot.com',
  messagingSenderId: '702874184451',
  appId: '1:702874184451:web:164f82510a2e1bf3cf1736'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
