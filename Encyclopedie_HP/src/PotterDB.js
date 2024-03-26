import axios from 'axios';

export async function getCharacters() {
    try {
        const response = await axios.get('https://api.potterdb.com/v1/characters');
        return response.data;
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des personnages :', error);
        return null;
    }
}

export async function getSpells() {
    try {
        const response = await axios.get('https://api.potterdb.com/v1/spells');
        return response.data;
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des sorts :', error);
        return null;
    }
}

export async function getBooks() {
    try {
        const response = await axios.get('https://api.potterdb.com/v1/books');
        return response.data;
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des livres :', error);
        return null;
    }
}

export async function getPotions() {
    try {
        const response = await axios.get('https://api.potterdb.com/v1/potions');
        return response.data;
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des potions :', error);
        return null;
    }
}