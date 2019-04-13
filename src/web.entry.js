import Vue from 'vue';
import UUID from 'vue-uuid';
import './style.scss';
import store from './store';
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Vue.use(UUID);


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

