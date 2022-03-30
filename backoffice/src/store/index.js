import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
export default new Vuex.Store({
    actions: {},
    modules: {},
    mutations: {
        setAdmin(state, admin) {
            state.admin = admin
        },
        setConnected(state, connected) {
            state.connected = connected
        },
        setToken(state, token) {
            state.token = token
        },
    },
    plugins: [vuexLocal.plugin],
    state: {
        admin: "",
        connected: false,
        token: "",
    },
})