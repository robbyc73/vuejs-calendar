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
            /**
             * Increment the month at the top of the date picker
             */
            incrementMonth() {
                this.closeEventForm();
                this.$store.commit('incrementMonth');
                // close event form if open
            },
            /**
             * Decrement the month at the top of the date picker
             */
            decrementMonth() {
                this.closeEventForm();
                this.$store.commit('decrementMonth');
            },
            /**
             * send the signal to close the event form and reset
             */
            closeEventForm() {
                this.$store.commit('updateEventForm',
                    {
                        positionX: 0,
                        positionY: 0,
                        elementId: null,
                        editEventElementId: '',
                        showEventForm: false,
                        eventDate: null
                    }
                );
            },
        }

    }
</script>