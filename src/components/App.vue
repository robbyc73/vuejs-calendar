<template>
    <div>
        <div>Month: {{ currentMonth }}</div>
        <div>Days on Month: {{ daysIMonth }}</div>
        <div>Current Day: {{ currentDay }}</div>
    </div>
</template>
<script>

    export default {
        name: 'app',
        data() {
            return {
                msg: 'Hello World 2',
                //current month
                currentMonth: this.$moment().month(),
                //days on month
                daysIMonth: this.$moment().daysInMonth(),


                //current day
                currentDay: this.$moment().dayOfYear()
            };
        },
    }
</script>