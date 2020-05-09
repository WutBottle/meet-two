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
};

export default userController;
