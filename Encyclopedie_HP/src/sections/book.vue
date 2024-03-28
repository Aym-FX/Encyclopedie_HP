<!-- book.vue -->

<template>
    <div class="books-page">
        <button class="home-button" @click="goToHome">Retour à l'accueil</button>
        <h1>Page des livres</h1>
        <input class="search-bar" type="text" v-model="searchTerm" placeholder="Rechercher un livre" @change="searchBooks">
        <ul class="books-list">
            <li class="book-item" v-for="book in books" :key="book.id">
                <h2 class="item-name"><span class="subtitle">{{ book.attributes.title }}</span></h2>
                <img class="book-cover" :src="book.attributes.cover" alt="Image du livre" v-if="book.attributes.cover">
                <p class="item-info" v-else>Image non disponible</p>
                <p class="item-info"><span class="subtitle">Auteur :</span> {{ book.attributes.author || 'Non disponible' }}</p>
                <p class="item-info"><span class="subtitle">Date de sortie :</span>{{ book.attributes.release_date || 'Non disponible' }}</p>
                <p class="item-info"><span class="subtitle">Résumé :</span>{{ book.attributes.summary || 'Non disponible' }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            books: [],
            page: {
                number: 1,
                size: 25,
            },
            searchTerm: '',
        };
    },
    created() {
        this.fetchBooks();
    },
    methods: {
        fetchBooks() {
            const queryParams = {
                page: {
                    number: this.page.number,
                    size: this.page.size
                },
                filter: {
                    title_cont: this.searchTerm 
                },
            };
            axios.get('https://api.potterdb.com/v1/books', { params: queryParams })
                .then(response => {
                    this.books = response.data.data;
                    this.totalPages = response.data.meta.totalPages;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        searchBooks() {
            this.page.number = 1;
            this.fetchBooks();
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

.books-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    list-style-type: none;
    padding: 0;
    color: #fff;
}

.book-item {
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
.book-cover {
    width: 200px;
    height: auto;
}
.search-bar {
    width: 60%;
    height: 20px;
    border-radius: 15px;
}
</style>