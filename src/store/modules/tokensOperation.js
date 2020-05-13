/*
* Author: zp
* 登录处理
*/
import api from '@api/apiSugar';
import {ACCESS_TOKEN, ROLE, ENVIRONMENT, ENABLE, ANSWER} from '@store/mutation-types';

const state = {
  status: '',
  token: localStorage.getItem(ACCESS_TOKEN) || '',
  role: localStorage.getItem(ROLE) || '',
  environment: localStorage.getItem(ENVIRONMENT) || '',
  enable: localStorage.getItem(ENABLE) || '',
  answer: localStorage.getItem(ANSWER) || '',
};

const mutations = {
  authSuccess(state, user) {
    state.status = 'success';
    //更新本地token
    localStorage.setItem(ACCESS_TOKEN, user.token);
    localStorage.setItem(ROLE, user.role);
    localStorage.setItem(ENABLE, user.enable);
    localStorage.setItem(ANSWER, user.answer);
    state.token = user.token;
    state.role = user.role;
    state.enable = user.enable;
    state.answer = user.answer;
  },
  authError(state) {
    state.status = 'error';
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ROLE);
  },
  logOut(state) {
    state.token = '';
    state.status = '';
    state.role = '';
    state.username = '';
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ROLE);
    localStorage.removeItem(ENABLE);
    localStorage.removeItem(ANSWER);
  },
  environmentSet(state, data) {
    state.environment = data;
    localStorage.setItem(ENVIRONMENT, data);
  }
};

const actions = {
  login({dispatch, commit, rootState}, params) {
    return new Promise((resolve, reject) => {
      api.tokensController.loginUser(params).then(res => {
        res.data.data && commit('authSuccess', res.data.data);
        resolve(res);
      }).catch(error => {
        commit('authError');
        reject(error);
      });
    })
  },
  logout({dispatch, commit, rootState}, params) {
    return new Promise((resolve, reject) => {
      commit('authRequest');
      api.tokensController.logout(params).then(res => {
        localStorage.removeItem(ACCESS_TOKEN);
        commit('logOut');
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    })
  },
  registerUser({dispatch, commit}, params) {
    return new Promise((resolve, reject) => {
      api.tokensController.registerUser(params).then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    })
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}