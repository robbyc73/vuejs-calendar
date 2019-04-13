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
        events:{

        }


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
         * add event to store state, if a key exists then create a new array element
         * otherwise push onto
         * @param state
         * @param payload
         */
        updateEvents(state,payload) {
                   //event date doesnt exist, then add
                   if(state.events[payload.eventDate] === undefined) {
                       state.events[payload.eventDate] = [];
                       state.events[payload.eventDate].push({uuid: payload.eventUuid, text: payload.eventText});
                       return true;
                   }

                   //check if the event already exists in the events, then updating
                   let updatedExistingEvent = false;
                    state.events[payload.eventDate].forEach(function(event){
                            if(event.uuid === payload.eventUuid) {
                                event.text = payload.eventText;
                                updatedExistingEvent = true;
                            }
                    });

                    // date exists in events and different event, then add
                    if(!updatedExistingEvent) {
                        state.events[payload.eventDate].push({uuid: payload.eventUuid, text: payload.eventText});
                    }

            return true;
        },

        removeEvent(state,payload) {

        }


    }
})