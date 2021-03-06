<template>
    <div @click="openShowEventForm" class="day" :class="classObject" :style="styleObject">
            {{ dayFormat }}
        <ul class="event-list">
            <li v-for="event in events" :id="event.uuid" :key="event.uuid">
                {{ event.text }}
            </li>
        </ul>
    </div>
</template>
<script>

    export default {
        name: 'calendar-day',

        props: {
            day: {
                type: Object,
                required: true
            },
        },

        computed: {
            /**
             * get the formatted day string
             */
            dayFormat() {
                return this.day.format('D');
            },
            /**
             * font weight is bold for current day
             * @returns {string}
             */
            getFontWeight() {
                return this.isCurrentDay ? 'bold' : 'normal';
            },
            getColor() {
                return this.isDayOutsideCurrentMonth ? 'grey' : 'black';
            },
            /**
             * check day is the current one
             * @returns {boolean}
             */
            isCurrentDay() {
                return this.day.isSame(this.$moment(),'day');
            },
            isBeforeCurrentDay() {
              return this.day.isBefore(this.$moment(),'day');
            },
            /**
             * grey out day out side this month
             */
            isDayOutsideCurrentMonth() {
                return !this.day.isSame(this.$moment(),'month');
            },
            /**
             * return the classes required
             * @returns {{day: boolean, today: computed.isCurrentDay}}
             */
            classObject() {
                return {
                    day: true,
                    today: this.isCurrentDay,
                    past: this.isBeforeCurrentDay,
                    active: (this.$store.state.eventDate === this.day)
                }
            },
            /**
             * return the styles required
             * @returns {{fontWeight: computed.getFontWeight, color: computed.getColor}}
             */
            styleObject() {
                return {
                    fontWeight: this.getFontWeight,
                    color: this.getColor
                }
            },
            /**
             * events for the current day
             */
            events() {
                return this.$store.state.events.filter(event => event.date === this.day.format('YYYY-MM-DD'));
            },
        },
        methods: {
            /**
             * open the event form at the clicked position
             * @param event
             */
            openShowEventForm(event) {
                this.$store.commit('updateEventForm',
                    {
                        positionX: event.clientX,
                        positionY: event.clientY,
                        elementId: event.srcElement.id,
                        showEventForm: true,
                        eventDate: this.day
                    }
                );
            },
        }
    }
</script>