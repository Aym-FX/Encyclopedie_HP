<template>
  <div class="spells-page">
    <button class="home-button" @click="goToHome">Retour à l'accueil</button>
    <h1>Page des sorts</h1>
    <input type="text" v-model="searchTerm" placeholder="Rechercher un sort" @change="fetchSpells">
    <ul class="spells-list">
      <li class="spell-item" v-for="spell in spells" :key="potion.id">
        <h2 class="item-name"><span class="subtitle">{{ spell.attributes.name }}</span></h2>
        <img :src="spell.attributes.image" alt="Image du sort" v-if="spell.attributes.image">
        <p class="item-info" v-else>Image non disponible</p>
        <p class="item-info"><span class="subtitle">Catégorie :</span> {{ spell.attributes.category || 'Non disponible' }}</p>
        <p class="item-info"><span class="subtitle">Effet :</span>{{ spell.attributes.effect || 'Non disponible' }}</p>
        <p class="item-info"><span class="subtitle">Créateur :</span>{{ spell.attributes.creator || 'Non disponible' }}</p>
      </li>
    </ul>
    <button @click="goToFirstPage" :disabled="page.number === 1"><<</button>
    <button @click="previousPage" :disabled="page.number === 1"><</button>
    <button @click="nextPage" :disabled="page.number === totalPages">></button>
    <button @click="goToLastPage" :disabled="page.number === totalPages">>></button>
    <br>
    <input type="number" v-model.number="page.number" @change="fetchSpells" :min="1" :max="totalPages">
    <p>Page actuelle : {{ page.number }} / {{ totalPages }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Spells',
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
    this.fetchSpells();
  },
  methods: {
    fetchSpells() {
      axios.get(`https://api.potterdb.com/v1/spells?page[number]=${this.page.number}&page[size]=${this.page.size}&filter[name]=${this.searchTerm}`)
        .then(response => {
          this.spells = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    nextPage() {
      if (this.page.number < this.totalPages) {
        this.page.number++;
        this.fetchSpells();
      }
    },
    previousPage() {
      if (this.page.number > 1) {
        this.page.number--;
        this.fetchSpells();
      }
    },
    goToFirstPage() {
      this.page.number = 1;
      this.fetchSpells();
    },
    goToLastPage() {
      this.page.number = this.totalPages;
      this.fetchSpells();
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
.spells-page {
  padding: 20px;
  background-color: #f9f9f9;
}

.spells-list {
  list-style-type: none;
  padding: 0;
  color: black;
}

.spells-item {
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