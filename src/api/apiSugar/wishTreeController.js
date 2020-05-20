/*
 * 许愿树接口管理
 * By ZP
 */

'use strict';
import axios from '../axiosServices';
import baseUrl from '../baseUrl'; // 导入接口域名列表

const wishTreeController = {
  // 获取愿望
  getWishTree(params) {
    return axios.post(`${baseUrl.wishTreeController}/getWishTree`, params);
  },
  // 添加愿望
  addWishTree(params) {
    return axios.post(`${baseUrl.wishTreeController}/addWishTree`, params);
  },
  water(params) {
    return axios.post(`${baseUrl.wishTreeController}/water`, params);
  },
  deleteWishTree(params) {
    return axios.post(`${baseUrl.wishTreeController}/deleteWishTree`, params);
  },
};

export default wishTreeController;
