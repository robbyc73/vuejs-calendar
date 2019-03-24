import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype,'$moment',{ get() {return this.$root.moment} });

export default new Vuex.Store({
    state: {
        current: moment(),
        eventFormPositionX: 0,
        eventFormPositionY: 0,
        showEventForm: false,
        eventDate: null,
        // key events by YYYY-MM-DD
        events:[

        ]
    },
    mutations: {
        /**
         * increment the current time by a month
         * @param state
         */
        incrementMonth(state) {
            state.current = state.current.clone().add(1, 'months');
        },
        /**
         * decrement the current time by a month
         * @param state
         */
        decrementMonth(state) {
            state.current = state.current.clone().subtract(1, 'months');
        },
        /**
         * update position of the event form
         * @param state
         * @param payload
         */
        updatePosition(state,payload) {
            state.eventFormPositionX = payload.positionX;
            state.eventFormPositionY = payload.positionY;
        },
        /**
         * update the show event form state
         * @param state
         * @param payload
         */
        updateShowEventForm(state,payload) {
            state.showEventForm = payload;
        },
        updateEventDate(state,payload) {
            state.eventDate = payload;
        },
        /**
         * update the events store state, if a key exists then create a new array element
         * otherwise push onto
         * @param state
         * @param payload
         */
        updateEvents(state,payload) {
               console.log("payload is "+JSON.stringify(payload));

                    state.events.push(payload);

                    //state.events[payload.eventDate].push(payload.eventText);

                //console.log("length is "+state.events[payload.eventDate].length);

        }

    }
})