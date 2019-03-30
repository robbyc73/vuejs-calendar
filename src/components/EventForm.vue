<template>

    <div id="event-form" :class="{ active: isActive }" :style="{ top: top, left: left }">
        <h4>Add Event</h4>

        <button @click="closeEventForm()" id="close-button">&#10005</button>
        <div>
            <input v-model="eventText" type="text">
            <button :disabled="eventTextEmpty" @click="saveEvent()">Save Event</button>
        </div>
    </div>
</template>
<script>
    import { uuid } from 'vue-uuid';
    export default {
        data() {
            return {
                eventText: ''
            }
        },
        props: {
            value: {
                type: Boolean,
                'default': false
            },
        },
        computed : {
            eventTextEmpty() {
                return this.eventText === '';
            },
            isActive() {
                return this.value;
            },
            /**
             * position of event form from top
             * @returns {string}
             */
            top(){
               return `${this.$store.state.eventFormPositionY}px`;
            },
            /**
             * position of event form from left
             * @returns {string}
             */
            left(){
                return `${this.$store.state.eventFormPositionX}px`;
            }
        },
        methods: {
            /**
             * send the signal to close the event form
             */
            closeEventForm() {
                this.$store.commit('updateShowEventForm',false);
            },
            saveEvent() {
                this.$store.commit('updateEvents',{eventDate: this.$store.state.eventDate, eventText: this.eventText, eventUuid: this.$uuid.v4()});
                this.closeEventForm();
            }

        },
        name: 'event-form'
    }
</script>
