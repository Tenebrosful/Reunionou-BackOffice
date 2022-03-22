import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Accueil',
        component: () => import ('../views/Accueil.vue')
    },
    {
        path: '/connexion',
        name: 'Connexion',
        component: () =>
            import ('../views/Connexion.vue')
    },
    {
        path: '/utilisateurs',
        name: 'Utilisateurs',
        component: () =>
            import ('../views/Utilisateurs.vue')
    },
    {
        path: '/evenements',
        name: 'Evenements',
        component: () =>
            import ('../views/Evenements.vue')
    },
    {
        path: '/utilisateurs/:id/evenements',
        name: 'UtilisateurEvenements',
        component: () =>
            import ('../views/UtilisateurEve.vue')
    },
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router