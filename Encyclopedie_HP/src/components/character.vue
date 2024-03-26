<template>
    <div class="characters-page">
        <h1>Page des personnages</h1>
        <input type="text" v-model="searchTerm" placeholder="Rechercher un personnage">
        <ul class="characters-list">
            <li class="character-item" v-for="character in filteredCharacters" :key="character.id">
                <h2 class="character-name"><span class="subtitle">{{ character.attributes.name }}</span></h2>
                <img :src="character.attributes.image" alt="Image du personnage" v-if="character.attributes.image">
                <p class="character-info" v-else>Image non disponible</p>
                <p class="character-info"><span class="subtitle">Affiliation :</span>{{ character.attributes.house || 'Non disponible' }}</p>
                <p class="character-info"><span class="subtitle">Biographie :</span>{{ character.attributes.jobs[0] || 'Non disponible' }}</p>
            </li>
        </ul>
        <button @click="goToFirstPage" :disabled="page.number === 1"><<</button>
        <button @click="previousPage" :disabled="page.number === 1"><</button>
        <button @click="nextPage" :disabled="page.number === totalPages">></button>
        <button @click="goToLastPage" :disabled="page.number === totalPages">>></button>
        <br>
        <input type="number" v-model.number="page.number" @change="fetchCharacters" :min="1" :max="totalPages">
        <p>Page actuelle : {{ page.number }} / {{ totalPages }}</p>
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
            totalPages: 187,
            searchTerm: '',
        };
    },
    created() {
        this.fetchCharacters();
    },
    computed: {
        filteredCharacters() {
            return this.characters.filter(character => 
                character.attributes.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        },
    },
    methods: {
    fetchCharacters() {
        const queryParams = {
            page: {
                number: this.page.number, // Page actuelle
                size: this.page.size // Taille de la page
            },
            filter: {
                name_cont: this.searchTerm // Filtrer par nom contenant le terme de recherche
            },
            sort: 'name' // Trier par nom
        };

        axios.get('https://api.potterdb.com/v1/characters', { params: queryParams })
            .then(response => {
                this.characters = response.data.data;
                this.totalPages = response.data.meta.totalPages;
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
        searchCharacters() {
        // Réinitialiser la page à 1 à chaque recherche
        this.page.number = 1;
        // Appeler la méthode fetchCharacters pour récupérer les données mises à jour
        this.fetchCharacters();
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

.subtitle {
        font-weight: bold;
        text-decoration: underline;
}
</style>