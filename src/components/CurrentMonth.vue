<template>
    <div>
    <!-- current month component here -->
    {{ month }}
    {{ year }}
    <button @click="incrementMonth">+</button>
    <button @click="decrementMonth">-</button>
    </div>
</template>
<script>
    export default {
        name: 'current-month',
        computed: {
            month() {
                return this.$store.state.current.format('MMMM');
            },
            year() {
                return this.$store.state.current.format('YYYY');
            },
        },
        methods: {
            incrementMonth() {
                this.$store.commit('incrementMonth');
            },
            decrementMonth() {
                this.$store.commit('decrementMonth');
            }
        }

    }
</script>