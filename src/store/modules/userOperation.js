/*
* Author: zp
* 用户控制
*/
import api from '@api/apiSugar';

const state = {
  pagingOption: {
    pageNum: 1,
    pageLimit: 6,
    totalNum: null,
    badge: null,
  },
  usersPagingOption: {
    pageNum: 1,
    pageLimit: 6,
    totalNum: null,
  },
};

const mutations = {

};

const actions = {

};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
