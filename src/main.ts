import Vue from 'vue';
import CompositionApi from '@vue/composition-api';

import App from './App.vue';
import router from './router';
import store from './store';
import './main.scss';

Vue.use(CompositionApi);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
