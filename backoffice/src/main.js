import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

Vue.config.productionTip = false

Vue.component("Header", () => import ("@/components/Header.vue"));

Vue.component("Footer", () => import ("./components/Footer.vue"));

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')