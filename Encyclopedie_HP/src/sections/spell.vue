<!-- spell.vue -->

<template>
  <div class="spells-page">
    <button class="home-button" @click="goToHome">Retour à l'accueil</button>
    <h1>Page des sorts</h1>
    <input class="search-bar"ype="text" v-model="searchTerm" placeholder="Rechercher un sort" @change="searchSpells">
    <ul class="spells-list">
      <li class="spell-item" v-for="spell in spells" :key="spell.id">
        <h2 class="item-name"><span class="subtitle">{{ spell.attributes.name }}</span></h2>
        <img :src="spell.attributes.image" alt="Image du sort" v-if="spell.attributes.image">
        <p class="item-info" v-else>Image non disponible</p>
        <p class="item-info"><span class="subtitle">Catégorie :</span> {{ spell.attributes.category || 'Non disponible' }}</p>
        <p class="item-info"><span class="subtitle">Effet :</span>{{ spell.attributes.effect || 'Non disponible' }}</p>
        <p class="item-info"><span class="subtitle">Créateur :</span>{{ spell.attributes.creator || 'Non disponible' }}</p>
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
            spells: [],
            page: {
                number: 1,
                size: 25,
            },
            totalPages: 13,
            searchTerm: '',
        };
    },
    created() {
        this.fetchSpells();
    },
    methods: {
        fetchSpells() {
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

            axios.get('https://api.potterdb.com/v1/spells', { params: queryParams })
                .then(response => {
                    this.spells = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        pageChanged(newPage) {
            this.page.number = newPage;
            this.fetchSpells();
        },
        searchSpells() {
            this.page.number = 1;
            this.fetchSpells();
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

.spells-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  list-style-type: none;
  padding: 0;
  color: #fff;
}

.spell-item {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #444;
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
.search-bar {
    width: 60%;
    height: 20px;
    border-radius: 15px;
}
</style>