import Vue from 'vue';
import './style.scss';
import Vuex from 'vuex';

Vue.use(Vuex);
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype,'$moment',{ get() {return this.$root.moment} });

const store = new Vuex.Store({
    state: {
        current: moment(),
    },
    mutations: {
        incrementMonth(state) {
            state.current.add(1, 'months').calendar();
        },
        decrementMonth(state) {
            state.current.subtract(1, 'months').calendar();
        }
    }
})

import App from './components/App.vue';
new Vue({
  el: '#app',
    data: {
      moment
    },
  components: {
        App
  },
    store: store

});
