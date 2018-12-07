import Vue from 'vue';
import './style.scss';
import Vuex from 'vuex';

Vue.use(Vuex);
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype,'$moment',{ get() {return this.$root.moment} });

const store = new Vuex.Store({
    state: {
        //currentYear: moment().format('YYYY'),
        //currentMonth: moment().format('M')
        currentYear: 2018,
        currentMonth: 12
    },
    mutations: {
        increment (state) {
            state.count++
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
