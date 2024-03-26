<template>
    <div class="book-page">
        <button class="home-button" @click="goToHome">Retour à l'accueil</button>
        <h1>Page des livres</h1>
        <input type="text" v-model="searchTerm" placeholder="Rechercher un livre" @change="fetchBooks">
        <ul class="books-list">
            <li class="book-item" v-for="book in books" :key="book.slug">
                <h2 class="item-name"><span class="subtitle">{{ book.attributes.title }}</span></h2>
                <img :src="book.attributes.cover" alt="Image du livre" v-if="book.attributes.cover">
                <p class="item-info" v-else>Image non disponible</p>
                <p class="item-info"><span class="subtitle">Auteur :</span> {{ book.attributes.author || 'Non disponible' }}</p>
                <p class="item-info"><span class="subtitle">Date de sortie :</span>{{ book.attributes.release_date || 'Non disponible' }}</p>
                <p class="item-info"><span class="subtitle">Résumé :</span>{{ book.attributes.summary || 'Non disponible' }}</p>
                <p class="item-info"><span class="subtitle">Nombre de pages :</span>{{ book.attributes.pages || 'Non disponible' }}</p>
                <p class="item-info"><span class="subtitle">Dédicace :</span>{{ book.attributes.dedication || 'Non disponible' }}</p>
                <p class="item-info"><span class="subtitle">Lien Wiki :</span><a :href="book.wiki" target="_blank">Cliquez ici</a></p>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Book',
    data() {
        return {
            books: [],
            searchTerm: '',
        };
    },
    created() {
        this.fetchBooks();
    },
    methods: {
        fetchBooks() {
            axios.get(`https://api.bookdb.com/v1/books?filter[name]=${this.searchTerm}`)
                .then(response => {
                    this.books = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        goToHome() {
            this.$router.push('/');
        },
    },
};
</script>

<!-- Le reste du code reste inchangé -->

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
.book-page {
    padding: 20px;
    background-color: #f9f9f9;
}

.books-list {
    list-style-type: none;
    padding: 0;
    color: black;
}

.book-item {
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