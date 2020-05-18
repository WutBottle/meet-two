import "@babel/polyfill";
import 'normalize.css/normalize.css'
// import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css';
// Vue.use(Antd);
// //
// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);

import store from './store'

Vue.config.productionTip = false;

import '@common/font/font.css'
import VueParticles from 'vue-particles'
Vue.use(VueParticles);

import {ACCESS_TOKEN, ROLE} from '@store/mutation-types';
const whiteList = ['LoginPage', 'MLoginPage']; // no redirect whitelist
router.beforeEach((to, from, next) => {
  const flag = Boolean(navigator.userAgent.match( // match方法可在字符串内检索指定的值，
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  ));
  store.commit('tokensOperation/environmentSet', flag);
  if(whiteList.includes(to.name)){
    if (flag && to.name === 'LoginPage'){
      router.push("/mobile/login");
    } else if(!flag && to.name === 'MLoginPage'){
      router.push("/pc/login");
    }
    next();
  } else {
    if (flag) {
      if (!localStorage.getItem(ACCESS_TOKEN)) {
        router.push("/mobile/login");
      } else {
        if (to.name === 'MAdmin' && localStorage.getItem(ROLE) != '管理员') {
          router.push("/404");
        } else {
          next();
        }
      }
    }else {
      if (!localStorage.getItem(ACCESS_TOKEN)) {
        router.push("/pc/login");
      } else {
        if (to.name === 'MAdmin' && localStorage.getItem(ROLE) != '管理员') {
          router.push("/404");
        } else {
          next();
        }
      }
    }
  }
});

new Vue({
  store,
  router: router,
  render: h => h(App),
}).$mount('#app');
