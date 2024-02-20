<template>
    <div class="characters-page">
        <h1>Page des personnages</h1>
        <ul class="characters-list">
            <li class="character-item" v-for="character in characters" :key="character.id">
                <h2 class="character-name">{{ character.attributes.name }}</h2>
                <p class="character-info">Affiliation : {{ character.attributes.house || 'Non disponible' }}</p>
                <p class="character-info">Biographie : {{ character.attributes.jobs[0] || 'Non disponible' }}</p>
            </li>
        </ul>
        <button @click="goToFirstPage" :disabled="page.number === 1">Première page</button>
        <button @click="previousPage" :disabled="page.number === 1">Page précédente</button>
        <button @click="nextPage" :disabled="page.number === totalPages">Page suivante</button>
        <button @click="goToLastPage" :disabled="page.number === totalPages">Dernière page</button>
        <input type="number" v-model.number="page.number" @change="fetchCharacters" :min="1" :max="totalPages">
        <p>Page actuelle : {{ page.number }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            characters: [],
            page: {
                number: 1,
                size: 25,
            },
            totalPages: 0,
        };
    },
    created() {
        this.fetchCharacters();
    },
    methods: {
        fetchCharacters() {
            axios.get(`https://api.potterdb.com/v1/characters?page[number]=${this.page.number}&page[size]=${this.page.size}`)
                .then(response => {
                    this.characters = response.data.data;
                    this.totalPages = Math.ceil(response.data.meta.total / this.page.size);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        nextPage() {
            if (this.page.number < this.totalPages) {
                this.page.number++;
                this.fetchCharacters();
            }
        },
        previousPage() {
            if (this.page.number > 1) {
                this.page.number--;
                this.fetchCharacters();
            }
        },
        goToFirstPage() {
            this.page.number = 1;
            this.fetchCharacters();
        },
        goToLastPage() {
            this.page.number = this.totalPages;
            this.fetchCharacters();
        },
    },
};
</script>

<style scoped>
.characters-page {
    padding: 20px;
    background-color: #f9f9f9;
}

.characters-list {
    list-style-type: none;
    padding: 0;
    color: black;
}

.character-item {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.character-name {
    margin: 0 0 10px;
    font-size: 20px;
}

.character-info {
    margin: 0 0 10px;
    font-size: 16px;
}
</style>