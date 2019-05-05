import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

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
        editEventElementId: "",
        eventDate: null,
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
         * Update all the information required by the event form
         * @param state
         * @param payload
         */
        updateEventForm(state,payload) {
            state.eventFormPositionX = payload.positionX;
            state.eventFormPositionY = payload.positionY;
            state.showEventForm = payload.showEventForm;
            state.editEventElementId = payload.elementId;
            state.eventDate = payload.eventDate;
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
        updateEditEventElementId(state,payload) {
            state.editEventElementId = payload.elementId;
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
            state.events = payload;
        },

        removeEvent(state,payload) {

        }


    },
    actions: {
        /**
         * persist events to the server
         * @param commit
         * @param payload
         * @returns {Promise}
         */
        updateEvents({commit},payload) {
            return new Promise((resolve,reject) => {

                Axios.post('/event',payload).then(response => {
                    if(response.status === 200) {
                        commit('updateEvents', response.data);
                        resolve();
                    } else {
                        reject()
                    }
                });

            });
        },
        //getEvents()
        /**
         * update event form data
         * @param commit
         * @param payload
         */
        updateEventForm({commit},payload) {
            commit('updateEventForm', payload);
        }
    }
})