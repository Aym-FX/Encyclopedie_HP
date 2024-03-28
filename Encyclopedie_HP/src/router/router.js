// router.js \\

import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../sections/Accueil.vue'
import Character from '../sections/character.vue'
import Potion from '../sections/potion.vue'
import Spell from '../sections/spell.vue'
import Book from '../sections/book.vue'

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