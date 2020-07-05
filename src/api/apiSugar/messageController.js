/*
 * 留言接口管理
 * By ZP
 */

'use strict';
import axios from '../axiosServices';
import baseUrl from '../baseUrl'; // 导入接口域名列表

const messageController = {
  // 获取留言接口
  getMessageWallList(params) {
    return axios.post(`${baseUrl.messageController}/getMessageWallList`, params);
  },
  // 添加留言接口
  addMessageWall(params) {
    return axios.post(`${baseUrl.messageController}/addMessageWall`, params);
  },
};

export default messageController;
