<template>
  <div class="potions-page">
    <button class="home-button" @click="goToHome">Retour à l'accueil</button>
    <h1>Page des potions</h1>
    <input type="text" v-model="searchTerm" placeholder="Rechercher une potion" @change="fetchPotions">
    <ul class="potions-list">
      <li class="potion-item" v-for="potion in potions" :key="potion.id">
        <h2 class="item-name"><span class="subtitle">{{ potion.attributes.name }}</span></h2>
        <img :src="potion.attributes.image" alt="Image de la potion" v-if="potion.attributes.image">
        <p class="item-info" v-else>Image non disponible</p>
        <p class="item-info"><span class="subtitle">Difficulté :</span> {{ potion.attributes.difficulty || 'Non disponible' }}</p>
        <p class="item-info"><span class="subtitle">Effet :</span>{{ potion.attributes.effect || 'Non disponible' }}</p>
        <p class="item-info"><span class="subtitle">Ingrédients :</span>{{ potion.attributes.ingredients || 'Non disponible' }}</p>
        <p class="item-info"><span class="subtitle">Caractéristiques :</span>{{ potion.attributes.characteristics || 'Non disponible' }}</p>
      </li>
    </ul>
    <button @click="goToFirstPage" :disabled="page.number === 1"><<</button>
    <button @click="previousPage" :disabled="page.number === 1"><</button>
    <button @click="nextPage" :disabled="page.number === totalPages">></button>
    <button @click="goToLastPage" :disabled="page.number === totalPages">>></button>
    <br>
    <input type="number" v-model.number="page.number" @change="fetchPotions" :min="1" :max="totalPages">
    <p>Page actuelle : {{ page.number }} / {{ totalPages }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Potions',
  data() {
    return {
      potions: [],
      page: {
        number: 1,
        size: 25,
      },
      totalPages: 7,
      searchTerm: '',
    };
  },
  created() {
    this.fetchPotions();
  },
  methods: {
    fetchPotions() {
      axios.get(`https://api.potterdb.com/v1/potions?page[number]=${this.page.number}&page[size]=${this.page.size}&filter[name]=${this.searchTerm}`)
        .then(response => {
          this.potions = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    nextPage() {
      if (this.page.number < this.totalPages) {
        this.page.number++;
        this.fetchPotions();
      }
    },
    previousPage() {
      if (this.page.number > 1) {
        this.page.number--;
        this.fetchPotions();
      }
    },
    goToFirstPage() {
      this.page.number = 1;
      this.fetchPotions();
    },
    goToLastPage() {
      this.page.number = this.totalPages;
      this.fetchPotions();
    },
    goToHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
p{
  color: black;
}
h1{
  color: black;
}
input{
  background-color: #ffffff;
  color: black;
}
.potions-page {
  padding: 20px;
  background-color: #f9f9f9;
}

.potions-list {
  list-style-type: none;
  padding: 0;
  color: black;
}

.potion-item {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
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
.home-button {
  float: left;
  margin-right: -150px;
  margin-top: 50px;
}
</style>