import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../components/Accueil.vue'
import Character from '../components/character.vue'
import Potion from '../components/potion.vue'
import Spell from '../components/spell.vue'
import Book from '../components/book.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Accueil },
    { path: '/character', component: Character },
    { path: '/potion', component: Potion},
    { path: '/spell', component: Spell},
    { path: '/book', component: Book},
  ]
})

export default router