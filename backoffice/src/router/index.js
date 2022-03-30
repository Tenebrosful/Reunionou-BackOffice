import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        component: () => import('../views/Accueil.vue'),
        name: 'Accueil',
        path: '/',
    },
    {
        component: () => import('../views/Connexion.vue'),
        name: 'Connexion',
        path: '/connexion',
    },
    {
        component: () => import('../views/Utilisateurs.vue'),
        name: 'Utilisateurs',
        path: '/utilisateurs',
    },
    {
        component: () => import('../views/Evenements.vue'),
        name: 'Evenements',
        path: '/evenements',
    },
    {
        component: () => import('../views/UtilisateurEve.vue'),
        name: 'UtilisateurEvenements',
        path: '/utilisateurs/:id/evenements',
    },
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router