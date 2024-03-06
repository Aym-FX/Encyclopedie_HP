<template>
    <div class="home">
        <h1>Bienvenue dans l'encyclopédie de Harry Potter</h1>
        <p>Explorez l'univers de Harry Potter à travers des potions, des sorts, des livres et des personnages.</p>
        <div class="links">
            <router-link class="button-categories" to="/potion"><span>Potions</span><span>Potions</span></router-link>
            <router-link class="button-categories" to="/spell"><span>Sorts</span><span>Sorts</span></router-link>
            <router-link class="button-categories" to="/book"><span>Livres</span><span>Livres</span></router-link>
            <router-link class="button-categories" to="/character"><span>Personnages</span><span>Personnages</span></router-link>
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
    margin: 20px;
}

.button-categories {
    position: relative;
    overflow: hidden;
    border: 1px solid #18181a;
    color: #18181a;
    display: inline-block;
    font-size: 15px;
    line-height: 15px;
    padding: 18px 18px 17px;
    text-decoration: none;
    cursor: pointer;
    background: #fff;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.button-categories span:first-child {
    position: relative;
    transition: color 600ms cubic-bezier(0.48, 0, 0.12, 1);
    z-index: 10;
}

.button-categories span:last-child {
    color: white;
    display: block;
    position: absolute;
    bottom: 0;
    transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);
    z-index: 100;
    opacity: 0;
    top: 50%;
    left: 50%;
    transform: translateY(225%) translateX(-50%);
    height: 14px;
    line-height: 13px;
}

.button-categories:after {
    content: "";
    position: absolute;
    bottom: -50%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    transform-origin: bottom center;
    transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
    transform: skewY(9.3deg) scaleY(0);
    z-index: 50;
}

.button-categories:hover:after {
    transform-origin: bottom center;
    transform: skewY(9.3deg) scaleY(2);
}

.button-categories:hover span:last-child {
    transform: translateX(-50%) translateY(-100%);
    opacity: 1;
    transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
}
</style>