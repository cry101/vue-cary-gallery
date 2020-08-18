import Vue from 'vue'
import App from './App.vue'
import Gallery from './lib'

Vue.use(Gallery)
Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')
