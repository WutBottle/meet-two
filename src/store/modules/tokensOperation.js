/*
* Author: zp
* 登录处理
*/
import api from '@api/apiSugar';
import {ACCESS_TOKEN, ROLE} from '@store/mutation-types';

const state = {
  status: '',
  token: localStorage.getItem(ACCESS_TOKEN) || '',
  role: localStorage.getItem(ROLE) || '',
  nickname: '',
  schoolNumber: '',
  gender: '',
};

const mutations = {
  authSuccess(state, user) {
    state.status = 'success';
    //更新本地token
    localStorage.setItem(ACCESS_TOKEN, user.token);
    localStorage.setItem(ROLE, user.role);
    state.token = user.token;
    state.role = user.role;
    state.nickname = user.nickname;
    state.schoolNumber = user.schoolNumber;
    state.gender = user.gender;
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
  },
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