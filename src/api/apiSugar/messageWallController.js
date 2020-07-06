/*
 * 留言接口管理
 * By ZP
 */

'use strict';
import axios from '../axiosServices';
import baseUrl from '../baseUrl'; // 导入接口域名列表

const messageWallController = {
  // 获取留言接口
  getMessageWallList(params) {
    return axios.post(`${baseUrl.messageWallController}/getMessageWallList`, params);
  },
  // 添加留言接口
  addMessageWall(params) {
    return axios.post(`${baseUrl.messageWallController}/addMessageWall`, params);
  },
};

export default messageWallController;
