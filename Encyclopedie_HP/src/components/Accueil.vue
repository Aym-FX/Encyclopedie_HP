<template class="accueil">
    <div class="home">
        <h1>Bienvenue dans l'encyclopédie de Harry Potter</h1>
        <p>Explorez l'univers de Harry Potter à travers des potions, des sorts, des livres et des personnages.</p>
        <div class="links">
            <router-link class="button-categories" to="/potion"><span class="text">Potions</span></router-link>
            <router-link class="button-categories" to="/spell"><span class="text">Sorts</span></router-link>
            <router-link class="button-categories" to="/book"><span class="text">Livres</span></router-link>
            <router-link class="button-categories" to="/character"><span class="text">Personnages</span></router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Accueil',
}
</script>

<style scoped>
.home{
    text-align: center;
    margin-top: 20px;
}

.links{
    margin: 40px 20px 20px;
}

.button-categories {
  border: 2px solid #7D4FFE;
  background-color: #7D4FFE;
  border-radius: 20px;
  color: #fff;
  transition: .3s;
  padding: 20px 40px;
  margin: 20px 20px 10px 10px;
}
.button-categories:hover {
  box-shadow: 8px 8px #b195ff;
  transition: .3s;
}
</style>