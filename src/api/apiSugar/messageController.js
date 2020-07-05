/*
 * 任务接口管理
 * By ZP
 */

'use strict';
import axios from '../axiosServices';
import baseUrl from '../baseUrl'; // 导入接口域名列表

const messageController = {
  // 获取任务接口
  getTaskListByUserId(params) {
    return axios.post(`${baseUrl.taskController}/getTaskListByUserId`, params);
  },
};

export default messageController;
