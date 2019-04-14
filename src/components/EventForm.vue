<template>

    <div id="event-form" :class="{ active: isActive }" :style="{ top: top, left: left }">
        <h4>{{saveEventButtonText}} Event</h4>

        <button @click="closeEventForm()" id="close-button">&#10005</button>
        <div class="text">
            <p>
            {{ eventDateText }}
            </p>
            <input v-focus v-model="eventText" type="text" @keyup.enter="saveEvent()">
        </div>
        <div class="buttons">
            <button class="button" :disabled="eventTextEmpty" @click="saveEvent()">{{saveEventButtonText}}</button>
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
            /**
             * output the event date in display format
             */
            eventDateText() {
                if(this.isActive) {
                    return this.$store.state.eventDate.format('dddd MMM Do');
                }
                return '';
            },
            /**
             * check event text empty
             */
            eventTextEmpty() {
                return this.eventText === '';
            },
            saveEventButtonText() {
                return this.$store.state.editEventElementId === "" ? 'Create' : 'Update';
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
            /**
             * commit the new event to the store
             */
            saveEvent() {
                if(!this.eventTextEmpty) {
                    let eventUuid = this.$uuid.v4();
                    if (this.$store.state.editEventElementId !== "") {
                        eventUuid = this.$store.state.editEventElementId;
                    }
                    this.$store.commit('updateEvents', {
                        date: this.$store.state.eventDate,
                        text: this.eventText,
                        uuid: eventUuid
                    });
                    this.closeEventForm();
                }
            },
        },
        directives: {
          focus: {
              update(el) {
                  el.focus();
              }
          }
        },
        name: 'event-form'
    }
</script>
