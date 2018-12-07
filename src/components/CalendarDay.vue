<template>
    <div>
        <span :style="{ fontWeight: getFontWeight, color: getColor }">
            {{ dayInYearMonthDayFormat }}
        </span>
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
            dayInYearMonthDayFormat() {
                return this.day.format('YYYY-MM-DD');
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
                return this.currentDay.format('YYYY-MM-DD') === this.dayInYearMonthDayFormat;
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