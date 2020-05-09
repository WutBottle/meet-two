/*
 * 用户中心接口调用
 * By ZP
 */

'use strict';
import axios from '../axiosServices';
import baseUrl from '../baseUrl'; // 导入接口域名列表

const tokensController = {
  // 登录用户
  loginUser(params) {
    return axios.post(`${baseUrl.tokensController}`, params);
  },
  // 注销用户
  logout(params) {
    return axios.post(`${baseUrl.tokensController}/logout`, params);
  },
};

export default tokensController;
