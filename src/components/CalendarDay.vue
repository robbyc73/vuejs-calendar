<template>
    <div class="day" :class="classObject" :style="styleObject">
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
                    past: this.isBeforeCurrentDay
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
            }
        }
    }
</script>