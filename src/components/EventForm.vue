<template>

    <div id="event-form" :class="{ active: isActive }" :style="{ top: top, left: left }">
        <h4>Add Event</h4>

        <button @click="closeEventForm()" id="close-button">&#10005</button>
        <div class="text">
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
                if(this.value) {
                    this.eventText = this.getEventText;
                } else {
                    this.eventText = '';
                }
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
            },
            /**
             * get event text based on if edit element event id present
             */
            getEventText() {
                if(this.$store.state.editEventElementId !== "") {

                    let event = this.$store.state.events.find(event => event.uuid === this.$store.state.editEventElementId);

                    if (event !== undefined) {
                        return event.text;
                    }
                     return '';
                }
                return '';
            }
        },
        methods: {
            /**
             * send the signal to close the event form
             */
            closeEventForm() {
                this.$store.commit('updateShowEventForm',false);
                this.resetEditElementEventId();
            },
            /**
             * commit the new event to the store
             */
            saveEvent() {
                let eventUuid = this.$uuid.v4();
                if(this.$store.state.editEventElementId !== "") {
                    eventUuid = this.$store.state.editEventElementId;
                }
                this.$store.commit('updateEvents',{date: this.$store.state.eventDate, text: this.eventText, uuid: eventUuid});
                this.closeEventForm();

            },

            /**
             * reset the edit element id in the store after event form closed
             */
            resetEditElementEventId() {
                this.$store.commit('updateEditEventElementId',{ elementId: ''});
            }
        },
        name: 'event-form'
    }
</script>
