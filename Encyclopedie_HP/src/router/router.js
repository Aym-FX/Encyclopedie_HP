import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../components/Accueil.vue'
import Character from '../components/character.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Accueil },
    { path: '/character', component: Character },
    // Ajoutez d'autres routes ici
  ]
})

export default router