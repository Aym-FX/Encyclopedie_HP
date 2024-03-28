<!-- pagination.vue -->

<template>
    <div>
        <button @click="goToFirstPage" :disabled="currentPage === 1"><<</button>
        <button @click="previousPage" :disabled="currentPage === 1"><</button>
        <button @click="nextPage" :disabled="currentPage === totalPages">></button>
        <button @click="goToLastPage" :disabled="currentPage === totalPages">>></button>
        <br>
        <input type="number" v-model.number="localCurrentPage" @change="pageChanged" :min="1" :max="totalPages">
        <p>Page actuelle : {{ localCurrentPage }} / {{ totalPages }}</p>
    </div>
</template>

<script>
export default {
    props: ['currentPage', 'totalPages'],
    data() {
        return {
            localCurrentPage: this.currentPage,
        };
    },
    watch: {
        currentPage(newVal) {
            this.localCurrentPage = newVal;
        },
    },
    methods: {
        nextPage() {
            if (this.localCurrentPage < this.totalPages) {
                this.$emit('page-changed', this.localCurrentPage + 1);
            }
        },
        previousPage() {
            if (this.localCurrentPage > 1) {
                this.$emit('page-changed', this.localCurrentPage - 1);
            }
        },
        goToFirstPage() {
            this.$emit('page-changed', 1);
        },
        goToLastPage() {
            this.$emit('page-changed', this.totalPages);
        },
        pageChanged() {
            this.$emit('page-changed', this.localCurrentPage);
        },
    },
};
</script>

<style scoped>
button {
    background-color: #800080;
    color: #fff;
}
</style>