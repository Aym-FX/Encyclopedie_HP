<template>
    <div class="item-details">
        <h2 class="item-name">{{ item.name }}</h2>
        <div v-for="field in fields" :key="field.key">
            <p class="item-info">{{ field.label }} : {{ item[field.key] || 'Non disponible' }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ItemDetails',
    props: {
        item: {
            type: Object,
            required: true,
        },
        fields: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
/* Styles pour le composant ItemDetails */
</style>