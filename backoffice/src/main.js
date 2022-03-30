import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.headers.post['Application'] = 'backOffice'
axios.defaults.headers.get['Application'] = 'backOffice'
axios.defaults.headers.delete['Application'] = 'backOffice'
axios.defaults.headers.put['Application'] = 'backOffice'

Vue.use(VueAxios, axios);

Vue.config.productionTip = false

Vue.component("Header", () => import ("@/components/Header.vue"));

Vue.component("Footer", () => import ("./components/Footer.vue"));

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')