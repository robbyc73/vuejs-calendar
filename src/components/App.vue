<template>
    <div>
        <div id="header">
            <div>
                <h1>
                    Vue JS Calendar
                </h1>
            </div>
            <div>
                <current-month></current-month>
            </div>
        </div>
    <div id="day-bar">
        <div v-for="day in daysInWeek">
            {{ day }}
        </div>
    </div>
    <div id="calendar">
        <div  v-for="week in weeks" class="calendar-week">
            <template v-for="day in week">
                <calendar-day :day="day"></calendar-day>
            </template>
        </div>
    </div>
    </div>
</template>
<script>
    import CalendarDay from './CalendarDay.vue';
    import CurrentMonth from './CurrentMonth.vue';
    export default {
        name: 'app',
        components: {
          CalendarDay,
          CurrentMonth
        },
        data() {
            return {
                //days on month
                daysIMonth: this.$moment().daysInMonth(),

                //current day
                currentDay: this.$moment(),

                daysInWeek: this.$moment.weekdays()
            };
        },

        computed: {
            month() {
                return this.$store.state.currentMonth;
            },
            year() {
                return this.$store.state.currentYear;
            },
            /**
             * get days in month including days falling within week before/after end of month
             * @returns {Array}
             */
            days() {
                let arrDays = [];
                let startDay = 1;
                while(startDay <= this.daysIMonth) {
                    let dayInMonth = this.$moment().date(startDay);
                    arrDays.push(dayInMonth);
                    startDay++;
                }

                let firstDayInMonth = arrDays[0];
                let lastDayInMonth = arrDays[arrDays.length-1];

                // figure out whereabouts in week the first day moment object is
                let dayInWeek = firstDayInMonth.isoWeekday();
                let arrDaysInWeekBeforeStartOfMonth = [];

                let dayBeforeDayInWeek = 1;
                while(dayBeforeDayInWeek < dayInWeek) {
                    arrDaysInWeekBeforeStartOfMonth.push(this.$moment(firstDayInMonth).subtract((dayInWeek - dayBeforeDayInWeek),"days"));
                    dayBeforeDayInWeek++;
                }

                arrDays = arrDaysInWeekBeforeStartOfMonth.concat(arrDays);

                // figure out whereabouts in week last day moment object is
                dayInWeek = lastDayInMonth.isoWeekday();
                let dayIncr = 1;

                while(dayInWeek <= 7) {
                    arrDays.push(this.$moment(lastDayInMonth).add(dayIncr,"days"));
                    dayIncr++;
                    dayInWeek++;
                }

                return arrDays;
            },
            /**
             * get all the weeks in the month
             * @returns {Array}
             */
            weeks() {
                let weeks = [];
                let week = [];

                for(let day of this.days) {
                    week.push(day);
                    if(week.length === 7) {
                        weeks.push(week);
                        week = [];
                    }
                }

                return weeks;
            },
        },
        methods: {
        }
    }
</script>