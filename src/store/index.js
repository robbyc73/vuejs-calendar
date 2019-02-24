import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype,'$moment',{ get() {return this.$root.moment} });

export default new Vuex.Store({
    state: {
        current: moment(),
    },
    mutations: {
        incrementMonth(state) {
            state.current = state.current.clone().add(1, 'months');
        },
        decrementMonth(state) {
            state.current = state.current.clone().subtract(1, 'months');
        }
    }
})