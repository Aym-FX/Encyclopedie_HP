<template>
    <div class="home">
        <h1>Bienvenue dans l'encyclopédie de Harry Potter</h1>
        <p>Explorez l'univers de Harry Potter à travers des potions, des sorts, des livres et des personnages.</p>
        <div class="links">
            <router-link to="/potion">Potions</router-link>
            <router-link to="/spell">Sorts</router-link>
            <router-link to="/book">Livres</router-link>
            <router-link to="/character">Personnages</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Accueil',
}
</script>

<style scoped>

</style>