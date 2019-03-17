<template>
    <div id="event-form" :class="{ active: isActive }" :style="{ top: eventFormPositionY+'px', left: eventFormPositionX+'px' }">

    </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: Boolean,
                'default': false
            },
            eventFormPositionX: {
                type: Number,
                'default': 0
            },
            eventFormPositionY: {
                type: Number,
                'default': 0
            }

        },
        computed : {
            isActive() {
                return this.value;
            }
        },
        name: 'event-form'
    }
</script>
