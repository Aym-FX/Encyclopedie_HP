<!-- potion.vue -->

<template>
  <div class="potions-page">
    <button class="home-button" @click="goToHome">Retour à l'accueil</button>
    <h1>Page des potions</h1>
    <input class="search-bar" type="text" v-model="searchTerm" placeholder="Rechercher une potion" @change="searchPotions">
    <ul class="potions-list">
      <li class="potion-item" v-for="potion in potions" :key="potion.id">
        <h2 class="item-name"><span class="subtitle">{{ potion.attributes.name }}</span></h2>
        <img :src="potion.attributes.image" alt="Image de la potion" v-if="potion.attributes.image">
        <p class="item-info" v-else>Image non disponible</p>
        <p class="item-info"><span class="subtitle">Catégorie :</span> {{ potion.attributes.category || 'Non disponible' }}</p>
        <p class="item-info"><span class="subtitle">Effet :</span>{{ potion.attributes.effect || 'Non disponible' }}</p>
        <p class="item-info"><span class="subtitle">Créateur :</span>{{ potion.attributes.creator || 'Non disponible' }}</p>
      </li>
    </ul>
    <Pagination :currentPage="page.number" :totalPages="totalPages" @page-changed="pageChanged"></Pagination>
  </div>
</template>

<script>
import Pagination from '../components/pagination.vue';
import axios from 'axios';

export default {
    components: {
        Pagination,
    },
    data() {
        return {
            potions: [],
            page: {
                number: 1,
                size: 25,
            },
            totalPages: 13,
            searchTerm: '',
        };
    },
    created() {
        this.fetchPotions();
    },
    methods: {
        fetchPotions() {
            const queryParams = {
                page: {
                    number: this.page.number,
                    size: this.page.size
                },
                filter: {
                    name_cont: this.searchTerm 
                },
                sort: 'name'
            };

            axios.get('https://api.potterdb.com/v1/potions', { params: queryParams })
                .then(response => {
                    this.potions = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
                pageChanged(newPage) {
                    this.page.number = newPage;
                    this.fetchPotions();
                },
        searchPotions() {
            this.page.number = 1;
            this.fetchPotions();
        },
        goToHome() {
            this.$router.push('/');
        },
    },
};
</script>

<style scoped>
body {
  background-color: #333;
  color: #fff;
}

.potions-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  list-style-type: none;
  padding: 0;
  color: #fff;
}

.potion-item {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #444;
}
.search-bar {
    width: 60%;
    height: 20px;
    border-radius: 15px;
}
.item-name {
  margin: 0 0 10px;
  font-size: 20px;
}

.item-info {
  margin: 0 0 10px;
  font-size: 16px;
}

.subtitle {
  font-weight: bold;
  text-decoration: underline;
}

button {
  background-color: #800080;
  color: #fff;
}

.home-button {
  float: left;
  margin-right: -150px;
  margin-top: 50px;
  background-color: #800080;
  color: #fff;
}
</style>