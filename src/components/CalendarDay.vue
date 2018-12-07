<template>
    <div :style="{ fontWeight: getFontWeight, color: getColor }">
            {{ dayFormat }}
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
            currentDay: {
                type: Object,
                required: true
            }
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
                return this.currentDay.format('YYYY-MM-DD') === this.dayFormat;
            },
            /**
             * grey out day out side this month
             */
            isDayOutsideCurrentMonth() {
                return this.currentDay.format('MMMM') !== this.day.format('MMMM');
            }
        }
    }
</script>