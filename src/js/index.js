import Vue from 'vue'
import App from '@/vue/App.vue'
import store from '@/vue/store'

/* eslint-disable no-new */
new Vue({
  el    : '#app',
  store,
  render: h => h(App),
})
