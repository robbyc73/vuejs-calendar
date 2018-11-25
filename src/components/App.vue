<template>
    <div>
        <div v-for="week in weeks">
            Week
            <div v-for="day in week">
            <span v-if="day.format('YYYY-MM-DD') == currentDay">
                <strong>{{ day.format('YYYY-MM-DD') }}</strong>
            </span>
            <span v-else>
                {{day.format('YYYY-MM-DD')}}
            </span>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'app',
        data() {
            return {
                //current month
                currentMonth: this.$moment().format('MMMM'),
                //days on month
                daysIMonth: this.$moment().daysInMonth(),

                //current day
                currentDay: this.$moment().format('YYYY-MM-DD')
            };
        },

        computed: {
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
            }
        }
    }
</script>