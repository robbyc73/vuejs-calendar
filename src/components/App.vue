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
                <calendar-day :day="day" v-for="day in week"></calendar-day>
        </div>
    </div>
        <event-form :value="getShowEventForm">
        </event-form>
    </div>
</template>
<script>
    import CalendarDay from './CalendarDay.vue';
    import CurrentMonth from './CurrentMonth.vue';
    import EventForm from "./EventForm.vue";
    export default {
        name: 'app',
        components: {
            EventForm,
            CalendarDay,
          CurrentMonth
        },
        data() {
            return {
                //days on month
                daysIMonth: this.$moment().daysInMonth(),
                //current day
                currentDay: this.$moment(),
                daysInWeek: this.$moment.weekdays(),
                showEventForm: false,
            };
        },

        computed: {
            getShowEventForm() {
              return this.$store.state.showEventForm;
            },
            month() {
                return this.$store.state.current.format('MMMM');
            },
            year() {
                return this.$store.state.current.format('YYYY');
            },
            getCurrentDaysInMonth() {
              return this.$store.state.current.daysInMonth();
            },
            /**
             * get days in month including days falling within week before/after end of month
             * @returns {Array}
             */
            days() {
                let arrDays = [];
                let startDay = 1;
                while(startDay <= this.getCurrentDaysInMonth) {
                    let dayInMonth = this.$store.state.current.date(startDay);
                    arrDays.push(dayInMonth.clone());
                    startDay++;
                }

                let firstDayInMonth = arrDays[0];
                let lastDayInMonth = arrDays[arrDays.length-1];

                // figure out whereabouts in week the first day moment object is
                let dayInWeek = firstDayInMonth.weekday();
                let arrDaysInWeekBeforeStartOfMonth = [];

                let dayBeforeDayInWeek = 0;
                while(dayBeforeDayInWeek < dayInWeek) {
                    let firstDayInMonthCopy = firstDayInMonth.clone();
                    arrDaysInWeekBeforeStartOfMonth.push(this.$moment(firstDayInMonthCopy).subtract((dayInWeek - dayBeforeDayInWeek),"days"));
                    dayBeforeDayInWeek++;
                }

                arrDays = arrDaysInWeekBeforeStartOfMonth.concat(arrDays);

                // figure out whereabouts in week last day moment object is
                dayInWeek = lastDayInMonth.weekday();
                let dayIncr = 1;

                while(dayInWeek <= 8) {
                    let lastDayInMonthCopy = lastDayInMonth.clone();
                    arrDays.push(this.$moment(lastDayInMonthCopy).add(dayIncr,"days"));
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