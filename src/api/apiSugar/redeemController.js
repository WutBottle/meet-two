/*
 * 积分兑换接口管理
 * By ZP
 */

'use strict';
import axios from '../axiosServices';
import baseUrl from '../baseUrl'; // 导入接口域名列表

const redeemController = {
  // 获取积分列表接口
  getRedeemList(params) {
    return axios.post(`${baseUrl.redeemController}/getRedeemList`, params);
  },
};

export default redeemController;
