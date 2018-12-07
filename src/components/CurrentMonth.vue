<template>
    <div>
    <!-- current month component here -->
    {{ month }}
    {{ year }}
    <button>+</button>
    <button>-</button>
    </div>
</template>
<script>
    export default {
        name: 'current-month',
        computed: {
            month() {
                return this.$store.state.currentMonth;
            },
            year() {
                return this.$store.state.currentYear;
            },
        }

    }
</script>