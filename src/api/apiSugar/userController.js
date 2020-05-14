/*
 * 用户中心接口调用
 * By ZP
 */

'use strict';
import axios from '../axiosServices';
import baseUrl from '../baseUrl'; // 导入接口域名列表

const userController = {
  // 注册新用户
  registerUser(params) {
    return axios.post(`${baseUrl.userController}/register`, params);
  },
  // 修改用户
  verifyUser(params) {
    return axios.post(`${baseUrl.userController}/verifyUser`, params);
  },
  // 获取用户信息
  getUserData() {
    return axios.get(`${baseUrl.userController}/userProfile`);
  },
  uploadAvatar(params) {
    return axios.post(`${baseUrl.userController}/upload`, params);
  },
  getUserListUnable(params) {
    return axios.post(`${baseUrl.userController}/getUserListUnable`, params);
  },
  userActive(params) {
    return axios.post(`${baseUrl.userController}/active`, params);
  },
  userMatch(params) {
    return axios.post(`${baseUrl.userController}/userMatch`, params);
  },
  love(params){
    return axios.post(`${baseUrl.userController}/love`, params);
  },
};

export default userController;
