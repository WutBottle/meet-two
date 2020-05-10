import "@babel/polyfill";
import 'normalize.css/normalize.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

import store from './store'

Vue.config.productionTip = false;



import '@common/font/font.css'
import VueParticles from 'vue-particles'
Vue.use(VueParticles);

new Vue({
  store,
  router: router,
  render: h => h(App),
}).$mount('#app');
