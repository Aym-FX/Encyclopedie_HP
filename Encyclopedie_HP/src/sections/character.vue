<!-- character.vue -->

<template>
    <div class="characters-page">
        <button class="home-button" @click="goToHome">Retour à l'accueil</button>
        <h1>Page des personnages</h1>
        <input class="search-bar"type="text" v-model="searchTerm" placeholder="Rechercher un personnage" @change="searchCharacters">
        <ul class="characters-list">
            <li class="character-item" v-for="character in characters" :key="character.id">
                <h2 class="character-name"><span class="subtitle">{{ character.attributes.name }}</span></h2>
                <img :src="character.attributes.image" alt="Image du personnage" v-if="character.attributes.image">
                <p class="character-info" v-else>Image non disponible</p>
                <p class="character-info"><span class="subtitle">Affiliation :</span>{{ character.attributes.house || 'Non disponible' }}</p>
                <p class="character-info"><span class="subtitle">Biographie :</span>{{ character.attributes.bio || 'Non disponible' }}</p>
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
                        characters: [],
                        page: {
                                number: 1,
                                size: 25,
                        },
                        totalPages: 187,
                        searchTerm: '',
                };
        },
        created() {
                this.fetchCharacters();
        },
        methods: {
                fetchCharacters() {
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

                        axios.get('https://api.potterdb.com/v1/characters', { params: queryParams })
                                .then(response => {
                                        this.characters = response.data.data;
                                })
                                .catch(error => {
                                        console.error(error);
                                });
                },
                pageChanged(newPage) {
                    this.page.number = newPage;
                    this.fetchCharacters();
                },
                searchCharacters() {
                        this.page.number = 1;
                        this.fetchCharacters();
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

.characters-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    list-style-type: none;
    padding: 0;
    color: #fff;
}
.search-bar {
    width: 60%;
    height: 20px;
    border-radius: 15px;
}
.character-item {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #444;
}

.character-name {
    margin: 0 0 10px;
    font-size: 20px;
}

.character-info {
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