import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.js' // Assurez-vous que le chemin est correct

createApp(App).use(router).mount('#app')