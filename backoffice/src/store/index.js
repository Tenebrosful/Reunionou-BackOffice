import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
export default new Vuex.Store({
    plugins:[vuexLocal.plugin],
    state: {
        token: "",
        admin: "",
        connected: false
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setAdmin(state, admin){
            state.admin = admin
        },
        setConnected(state, connected){
            state.connected = connected
        }
    },
    actions: {},
    modules: {}
})