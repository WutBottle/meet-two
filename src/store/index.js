import Vue from 'vue'
import Vuex from 'vuex'

import tokensOperation from './modules/tokensOperation';
import userOperation from "./modules/userOperation";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    tokensOperation, //登录
    userOperation
  },
});

export default store;
