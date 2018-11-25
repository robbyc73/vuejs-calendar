<template>
    <div>
        <div>Month: {{ currentMonth }}</div>
        <div>Days in Month: {{ daysIMonth }}</div>
        <div class="row" v-for="day in getDaysInMonth">
            <span v-if="day.format('YYYY-MM-DD') == currentDay">
                <strong>{{ day.format('YYYY-MM-DD') }}</strong>
            </span>
            <span v-else>
                {{day.format('YYYY-MM-DD')}}
            </span>
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
             * get days in month
             * @returns {Array}
             */
            getDaysInMonth() {
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
                    let dayBeforeDayInWeekObj = this.$moment(firstDayInMonth);
                    arrDaysInWeekBeforeStartOfMonth.push(dayBeforeDayInWeekObj.subtract((dayInWeek - dayBeforeDayInWeek),"days"));
                    dayBeforeDayInWeek++;
                }

                arrDays = arrDaysInWeekBeforeStartOfMonth.concat(arrDays);

                // figure out whereabouts in week last day moment object is
                dayInWeek = lastDayInMonth.isoWeekday();
                let dayIncr = 1;

                while(dayInWeek <= 7) {
                    let dayAfterDayInWeekObj = this.$moment(lastDayInMonth);
                    arrDays.push(dayAfterDayInWeekObj.add(dayIncr,"days"));
                    dayIncr++;
                    dayInWeek++;
                }

                return arrDays;
            }
        }
    }
</script>