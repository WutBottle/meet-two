import Vue from 'vue'
import Vuex from 'vuex'

import tokensOperation from './modules/tokensOperation'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    tokensOperation, //登录
  },
});

export default store;
