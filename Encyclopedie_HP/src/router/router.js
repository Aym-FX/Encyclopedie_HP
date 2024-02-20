import Vue from 'vue';
import Router from 'vue-router';
import Character from '../components/character.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/characters',
            name: 'characters',
            component: Character,
        },
    ],
});